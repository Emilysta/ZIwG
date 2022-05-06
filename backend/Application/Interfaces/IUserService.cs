using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public Task<bool> UploadProfilePicture(FileUpload fileObj);
        public bool ChangeDisplayData(DisplayDataDTO model);
        public bool DeleteUser();
        public string GetCurrenUserMail();
        public Task<bool> SaveChangesAsync();
    }
}
