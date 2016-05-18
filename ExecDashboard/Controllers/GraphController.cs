using Data;
using Data.Infrastructure;
using Data.Repositories;
using ExecDashboard.Helpers;
using ExecDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExecDashboard.Controllers
{
    public class GraphController : BaseController
    {
        private readonly IEntityBaseRepository<User> _userRepository;
        private readonly IEntityBaseRepository<SystemLog> _systemLogRepository;
        private readonly IEntityBaseRepository<Project> _projectRepository;
        private readonly IEntityBaseRepository<Voucher> _voucherRepository;
        private readonly IEntityBaseRepository<VoucherEntry> _voucherEntryRepository;
        private readonly IEntityBaseRepository<SalesInvoice> _salesInvoiceRepository;
        private readonly IEntityBaseRepository<SalesInvoiceEntry> _salesInvoiceEntryRepository;
        private const int seriesCount = 7;


        public GraphController(IEntityBaseRepository<User> userRepository, IEntityBaseRepository<SystemLog> systemLogRepository,
            IEntityBaseRepository<Project> projectRepository, IEntityBaseRepository<Voucher> voucherRepository,
            IEntityBaseRepository<VoucherEntry> voucherEntryRepository, IEntityBaseRepository<SalesInvoice> salesInvoiceRepository,
            IEntityBaseRepository<SalesInvoiceEntry> salesInvoiceEntryRepository,
             IUnitOfWork _unitOfWork)
            : base(_unitOfWork)
        {
            _userRepository = userRepository;
            _systemLogRepository = systemLogRepository;
            _projectRepository = projectRepository;
            _voucherRepository = voucherRepository;
            _voucherEntryRepository = voucherEntryRepository;
            _salesInvoiceRepository = salesInvoiceRepository;
            _salesInvoiceEntryRepository = salesInvoiceEntryRepository;
        }

        public ActionResult ActiveUsers(string dateFrom, string dateTo)
        {
            var _dateFrom = DateTime.Parse(dateFrom);
            var _dateTo = DateTime.Parse(dateTo).AddDays(1).AddSeconds(-1);
            var model = new LineGraphModel();
            var dataset = new ChartDatasetLine();
            dataset.data = new List<double>();

            var userLogins = _systemLogRepository
                .FindBy(s => s.Date >= _dateFrom && s.Date <= _dateTo && s.Action == "Login" && s.Table == "User")
                .ToList()
                .Select(s => new GenericXYModel()
                {
                    Count = 1,
                    Date = new DateTime(s.Date.Year, s.Date.Month, s.Date.Day)
                })
                .GroupBy(s => s.Date)
                .Select(s => new GenericXYModel()
                {
                    Count = s.Count(),
                    Date = s.Key
                })
                .ToList();

            TimeSpan daysDiff = _dateTo.AddSeconds(1).AddDays(-1) - _dateFrom;
            var accuDays = 1;
            int aggDays = (int)daysDiff.TotalDays / seriesCount;
            for (int x = 0; x < daysDiff.TotalDays; x++)
            {
                var selectedDate = _dateFrom.AddDays(x);
                var userCount = userLogins.FirstOrDefault(s => s.Date == selectedDate);
                dataset.data.Add(userCount != null ? userCount.Count : 0);

                if (accuDays == aggDays || selectedDate == _dateFrom)
                {
                    model.labels.Add(selectedDate.ToString("MMM-dd-yy"));
                    accuDays = 1;
                }
                else
                {
                    model.labels.Add("");
                    accuDays++;
                }
            }
            ViewBag.Max = userLogins.Count() > 0 ? userLogins.Max(s => s.Count) : 10;
            model.datasets.Add(dataset);
            return PartialView("_ActiveUsers", model);
        }

        public ActionResult NewProjects(string dateFrom, string dateTo)
        {
            var _dateFrom = DateTime.Parse(dateFrom);
            var _dateTo = DateTime.Parse(dateTo).AddDays(1).AddSeconds(-1);
            var model = new LineGraphModel();
            var dataset = new ChartDatasetLine();
            dataset.fillColor = "#99FFB3";
            dataset.strokeColor = "#00D134";
            dataset.data = new List<double>();

            var projects = _projectRepository
                .FindBy(s => s.DateCreated >= _dateFrom && s.DateCreated <= _dateTo)
                .ToList()
                .Select(s => new GenericXYModel()
                {
                    Count = 1,
                    Date = new DateTime(s.DateCreated.Year, s.DateCreated.Month, s.DateCreated.Day)
                })
                .GroupBy(s => s.Date)
                .Select(s => new GenericXYModel()
                {
                    Count = s.Count(),
                    Date = s.Key
                })
                .ToList();

            TimeSpan daysDiff = _dateTo.AddSeconds(1).AddDays(-1) - _dateFrom;
            var accuDays = 1;
            int aggDays = (int)daysDiff.TotalDays / seriesCount;
            for (int x = 0; x < daysDiff.TotalDays; x++)
            {
                var selectedDate = _dateFrom.AddDays(x);
                var userCount = projects.FirstOrDefault(s => s.Date == selectedDate);
                dataset.data.Add(userCount != null ? userCount.Count : 0);

                if (accuDays == aggDays || selectedDate == _dateFrom)
                {
                    model.labels.Add(selectedDate.ToString("MMM-dd-yy"));
                    accuDays = 1;
                }
                else
                {
                    model.labels.Add("");
                    accuDays++;
                }
            }
            ViewBag.Max = projects.Count() > 0 ? projects.Max(s => s.Count) : 10;
            model.datasets.Add(dataset);
            return PartialView("_NewProjects", model);
        }

        public ActionResult Vouchers(string dateFrom, string dateTo)
        {
            var _dateFrom = DateTime.Parse(dateFrom);
            var _dateTo = DateTime.Parse(dateTo).AddDays(1).AddSeconds(-1);
            var model = new LineGraphModel();
            var dataset = new ChartDatasetLine();
            dataset.fillColor = "#FF906B";
            dataset.strokeColor = "#FF4405";
            dataset.data = new List<double>();

            var vouchers = _voucherRepository
                .FindBy(s => s.DateAdded >= _dateFrom && s.DateAdded <= _dateTo)
                .ToList();

            var projects = vouchers.Select(s => s.Project).Distinct().OrderBy(s => s.Name).ToList();

            if (projects.Count() == 0)
            {
                model.labels.Add("No project");
                dataset.data.Add(0);
            }

            foreach(var project in projects)
            {
                model.labels.Add(project.Name.Length > 10 ? project.Name.Substring(0, 10) : project.Name);
                var pvAmount = vouchers.Where(s => s.ProjectID == project.ID)
                    .Select(s => s.VoucherEntries.Sum(ve => ve.Credit));
                int amount = (int)(pvAmount.Count() > 0 ? pvAmount.Sum() : 0);
                dataset.data.Add(amount);
            }

            ViewBag.Max = dataset.data.Count() > 0 ? dataset.data.Max() : 10;
            model.datasets.Add(dataset);
            return PartialView("_Vouchers", model);
        }

        public ActionResult SalesInvoices(string dateFrom, string dateTo)
        {
            var _dateFrom = DateTime.Parse(dateFrom);
            var _dateTo = DateTime.Parse(dateTo).AddDays(1).AddSeconds(-1);
            var model = new LineGraphModel();
            var dataset = new ChartDatasetLine();
            dataset.fillColor = "#F4D1FF";
            dataset.strokeColor = "#DA6BFF";
            dataset.data = new List<double>();

            var sInvoices = _salesInvoiceRepository
                .FindBy(s => s.DateAdded >= _dateFrom && s.DateAdded <= _dateTo)
                .ToList();

            var projects = sInvoices.Select(s => s.Project).Distinct().OrderBy(s => s.Name).ToList();

            if (projects.Count() == 0)
            {
                model.labels.Add("No project");
                dataset.data.Add(0);
            }

            foreach (var project in projects)
            {
                model.labels.Add(project.Name.Length > 10 ? project.Name.Substring(0, 10) : project.Name);
                var psAmount = sInvoices.Where(s => s.ProjectID == project.ID)
                    .Select(s => s.SalesInvoiceEntries.Sum(se => se.Quantity * se.UnitPrice));
                int amount = (int)(psAmount.Count() > 0 ? psAmount.Sum() : 0);
                dataset.data.Add(amount);
            }

            ViewBag.Max = dataset.data.Count() > 0 ? dataset.data.Max() : 10;
            model.datasets.Add(dataset);
            return PartialView("_SalesInvoices", model);
        }

    }
}