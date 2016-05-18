using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExecDashboard.Models
{
    public class LineGraphModel
    {
        public LineGraphModel()
        {
            labels = new List<string>();
            datasets = new List<ChartDatasetLine>();
        }

        public List<String> labels { get; set; }
        public List<ChartDatasetLine> datasets { get; set; }
        public string xAxisLabel { get; set; }
    }
}