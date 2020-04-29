using System.IO;

namespace BusinessLogic.FileHandling
{
    public interface IFileHandler
    {
        string SaveFile(FileStream fileStream);
    }
}