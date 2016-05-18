using Data.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExecDashboard.Controllers
{
    public class BaseController : Controller
    {
        #region private fields
        protected readonly IUnitOfWork _unitOfWork;
        #endregion //private fields

        public BaseController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


    }
}