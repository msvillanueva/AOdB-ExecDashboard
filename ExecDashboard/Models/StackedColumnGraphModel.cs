using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExecDashboard.Models
{
    public class StackedColumnGraphModel
    {
        public StackedColumnGraphModel()
        {
            labels = new List<string>();
            datasets = new List<ChartDataset>();
        }

        public List<String> labels { get; set; }
        public List<ChartDataset> datasets { get; set; }
        public string xAxisLabel { get; set; }
    }
}