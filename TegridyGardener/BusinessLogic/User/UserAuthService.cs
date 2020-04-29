using System.Linq;
using Model;
using Persistence;

namespace BusinessLogic
{
    public class UserAuthService : IUserAuthService
    {
        private readonly TegridyDbContext _dbContext;

        public UserAuthService(TegridyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetUser(int userId)
        {
            return _dbContext.Users.FirstOrDefault(x => x.Id == userId);
        }
    }

    public interface IUserAuthService
    {
        User GetUser(int userId);
    }
}