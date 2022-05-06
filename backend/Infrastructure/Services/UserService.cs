using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using Application.Interfaces;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using Domain.Contexts;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _accessor;

        public UserService (UserManager<User> userManager, IMapper mapper, DataBaseContext context, IHttpContextAccessor accessor)
        {
            _mapper = mapper;
            _context = context;
            _accessor = accessor;
        }

        public async Task<bool> UploadProfilePicture(FileUpload fileObj)
        {
            if (fileObj.files.Length > 0)
            {
                var userEmail = GetCurrenUserMail();
                var user = _context.Users.Where(x => x.Email == userEmail).SingleOrDefault();
                if (user == null)
                    return false;
                using (var ms = new MemoryStream())
                {
                    ms.Flush();
                    ms.Position = 0;
                    await fileObj.files.CopyToAsync(ms);
                    var fileBytes = ms.ToArray();
                    user.Photo = fileBytes;
                    _context.Users.Update(user);
                    if (await SaveChangesAsync())
                        return true;
                }
            }
            return false;
        }

        public bool ChangeDisplayData(DisplayDataDTO model)
        {
            var userEmail = GetCurrenUserMail();
            var userToModify = _context.Users.Where(x => x.Email == userEmail).SingleOrDefault();
            if (userToModify == null)
                return false;

            userToModify = _mapper.Map(@model, userToModify);
            _context.Users.Update(userToModify);
            return true;
        }
        
        public bool DeleteUser()
        {
            var userEmail = GetCurrenUserMail();
            var userToDelete = _context.Users.Where(x => x.Email == userEmail).SingleOrDefault();
            if (userToDelete == null)
                return false;

            else
            {
                _context.Users.Remove(userToDelete);
                return true;
            }
        }

        public string GetCurrenUserMail()
        {
            var UserMail = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            return UserMail;
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
