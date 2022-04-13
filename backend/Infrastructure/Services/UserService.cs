using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Application.Interfaces;
using Application.DTOs.UserDTOs;
using Domain.Entities;
using Domain.Contexts;
using System.IO;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public UserService (UserManager<User> userManager, IMapper mapper, DataBaseContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> UploadProfilePicture(FileUpload fileObj, string id)
        {
            if (fileObj.files.Length > 0)
            {
                User user = _context.Users.Where(x => x.Id == id).SingleOrDefault();
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

        public bool ChangeDisplayData(DisplayDataDTO model, string id)
        {
            var userToModify = _context.Users.Where(x => x.Id == id).SingleOrDefault();
            if (userToModify == null)
                return false;

            userToModify = _mapper.Map(@model, userToModify);
            _context.Users.Update(userToModify);
            return true;
        }
        
        public bool DeleteUser(string id)
        {
            var userToDelete = _context.Users.Where(x => x.Id == id).SingleOrDefault();
            if (userToDelete == null)
                return false;

            else
            {
                _context.Users.Remove(userToDelete);
                return true;
            }
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
