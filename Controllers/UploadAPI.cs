using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;



namespace BA_Test.Controllers
{
    [Route("api/UploadController")]
    [Controller]
    
    public class UploadController : Controller
    {
        [HttpPost]
        public void NewFile(IFormFile obj)
        {
            var path = Path.Combine(  
                Directory.GetCurrentDirectory(), "wwwroot", "Uploads", 
                System.IO.Path.GetFileName(obj.FileName));  
        
            using (var stream = new FileStream(path, FileMode.Create))  
            {  
                obj.CopyTo(stream);
            }  
        }
    }
}