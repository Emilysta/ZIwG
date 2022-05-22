using System.Net;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using AutoMapper;
using Application.Interfaces;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using Domain.Contexts;


namespace Infrastructure.Services
{
    public class LoggingService : ILoggingService
    {
        private readonly DataBaseContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public LoggingService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, DataBaseContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _context = context;
        }
        public async Task<bool> Login(LoginDTO model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

                if (signInResult.Succeeded)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<bool> Register(RegisterDTO model)
        {
            var userToRegister = new User {
                UserName = model.Email
            };
            userToRegister = _mapper.Map(model, userToRegister);

            var createAccountResult = await _userManager.CreateAsync(userToRegister, model.Password);
            if (createAccountResult.Succeeded) {
                await _signInManager.SignInAsync(userToRegister, isPersistent: false);
                return true;
            }
            return false;
        }

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<bool> SendPasswordRecoveryEmail(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail.ToUpper());
            if (user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                string redirectLink = "https://ziwg.toadres.pl/reset/" + token;
                MailMessage mailMessage = new MailMessage("eventcollabteam@gmail.com", userEmail);
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = "ZIWG Password reset";
                mailMessage.Body = "Hello Arek,<br/>You recently requested to reset your password for your Event Collab account. Use the button below to change it:" +
                    "<br/><a href=" + redirectLink + ">" + "Password reset" + "</a>" + "<br/><br/>If you didn't request this, please ignore this email." +
                    "<br/><br/> Regards <br/> Event Collab Team";
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.Credentials = new NetworkCredential()
                {
                    UserName = "eventcollabteam@gmail.com",
                    Password = "eventcollab1!"
                };
                smtpClient.EnableSsl = true;
                smtpClient.Send(mailMessage);
                return true;
            }
            return false;
        }

        public async Task<bool> ResetPassword(ReserPasswordDTO resetPasswordDTO)
        {
            var user = await _userManager.FindByNameAsync(resetPasswordDTO.UserEmail);
            if (user != null)
            {
                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.Password);
                if (result.Succeeded)
                {
                    return true;
                }
            }
            return false;
        }

        public AuthenticationProperties LoginWithGoogle(string redirectUrl)
        {
            var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl);
            return properties;
        }

        public async Task<bool> GetGoogleResponse()
        {
            ExternalLoginInfo info = await _signInManager.GetExternalLoginInfoAsync();
            var claims = info.Principal.Claims.Select(claim => new
            {
                claim.Issuer,
                claim.OriginalIssuer,
                claim.Type,
                claim.Value
            });

            var email = claims.ElementAt(4).Value;
            var checkUser = _context.Users.Where(x => x.Email == email).SingleOrDefault();
            if (checkUser == null)
            {
                var usertoadd = new User
                {
                    DisplayName = claims.ElementAt(1).Value,
                    FirstName = claims.ElementAt(2).Value,
                    LastName = claims.ElementAt(3).Value,
                    UserName = email,
                    Email = email
                };
                var imageUrl = claims.ElementAt(5).Value;
                WebClient client = new WebClient();
                Stream stream = client.OpenRead(imageUrl);
                var ms = new MemoryStream();
                ms.Flush();
                ms.Position = 0;
                await stream.CopyToAsync(ms);
                var fileBytes = ms.ToArray();
                usertoadd.Photo = fileBytes;
                await _userManager.CreateAsync(usertoadd);
                await SaveChangesAsync();
                await _signInManager.SignInAsync(usertoadd, isPersistent: false);
                return true;
            }
            await _signInManager.SignInAsync(checkUser, isPersistent: false);
            return true;
        }

        public async Task<bool> SaveChangesAsync()
        {
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
