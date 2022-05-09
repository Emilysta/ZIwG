using System.Threading.Tasks;
using Application.DTOs.UserDTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public Task<bool> UploadProfilePicture(FileUpload fileObj);
        public bool ChangeDisplayData(DisplayDataDTO model);
        public bool DeleteUser();
        public string GetCurrenUserMail();
        public string GetCurrenUserId();
        public Task<ReturnUserDataDTO> GetCurrenUserData();
        public Task<bool> SaveChangesAsync();
    }
}
