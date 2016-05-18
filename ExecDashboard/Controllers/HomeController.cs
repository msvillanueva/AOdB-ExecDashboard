using Data;
using Data.Infrastructure;
using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExecDashboard.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IEntityBaseRepository<User> _userRepository;

        public HomeController(IEntityBaseRepository<User> userRepository,
             IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _userRepository = userRepository;
        }

        public ActionResult Index()
        {
            //var user = _userRepository.FindBy(s => s.Username.Contains("admin")).FirstOrDefault();

            return View();
        }
    }
}