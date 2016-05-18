using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExecDashboard.Models
{
    public class ChartDataset
    {
        public ChartDataset()
        {
            fillColor = new List<string>();
            strokeColor = new List<string>();
            data = new List<double>();
            pointColor = new List<string>();
            pointStrokeColor = new List<string>();
            fill = true;
        }

        public List<string> fillColor { get; set; }
        public List<string> strokeColor { get; set; }
        public List<double> data { get; set; }
        public string type { get; set; }
        public bool fill { get; set; }
        public List<string> pointColor { get; set; }
        public List<string> pointStrokeColor { get; set; }
        public string axis { get; set; }
    }
}