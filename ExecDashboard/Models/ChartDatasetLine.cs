using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExecDashboard.Models
{
    public class ChartDatasetLine
    {
        public ChartDatasetLine()
        {
            data = new List<double>();
            pointColor = "green";
            pointStrokeColor = "yellow";
            fillColor = "rgba(151,187,205,0.5)";
            strokeColor = "#428bca";
        }

        public string fillColor { get; set; }
        public string strokeColor { get; set; }
        public List<double> data { get; set; }
        public string pointColor { get; set; }
        public string pointStrokeColor { get; set; }
        public string axis { get; set; }
    }
}