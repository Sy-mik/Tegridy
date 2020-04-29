using System;
using System.IO;

namespace BusinessLogic.FileHandling
{
    public class FileHandler : IFileHandler
    {
        public string SaveFile(FileStream fileStream)
        {
            Guid guid = Guid.NewGuid();
            return guid.ToString();
        }
    }
}