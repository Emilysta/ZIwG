using System.Threading.Tasks;
using Application.DTOs.UserDTOs;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public Task<bool> UploadProfilePicture(FileUpload fileObj, string id);
        public bool ChangeDisplayData(DisplayDataDTO model, string id);
        public bool DeleteUser(string id);
        public Task<bool> SaveChangesAsync();
    }
}
