using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using CaptchaAPI.Models;
using System.Web;
using System.Configuration;

namespace CaptchaAPI.Controllers
{
    // [Authorize]
    public class ImageController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [Route("data/getRandomImage")]
        [HttpGet]
        public HttpResponseMessage GetRandomImage()
        {
            var imagePath = HttpContext.Current.Server.MapPath("~/Resource/BackgroundImage");
            EmailModel obj = new EmailModel();
            try
            {
                var rand = new Random();
                var files = Directory.GetFiles(imagePath);

                //var random = new Random();
                //var numbers = Enumerable.Range(1, files.Length).TakeRandom(1, random);
                //numbers.Shuffle(random);
                //var bgImage = files[numbers.First()];
                var bgImage = Path.GetFileName(files[rand.Next(files.Length)]);
                obj.ImageUrl = ConfigurationManager.AppSettings["imageURL"].ToString() + bgImage;
                //obj.DropImageUrl = ConfigurationManager.AppSettings["dropURL"].ToString() + "drop" + bgImage.ToString();
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            return Request.CreateResponse(HttpStatusCode.OK, obj);
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }


        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
