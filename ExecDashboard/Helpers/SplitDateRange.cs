using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExecDashboard.Helpers
{
    public static class SplitDateRange
    {
        public static List<DateTime> Get(DateTime from, DateTime to, int noOfSplit)
        {
            var dates = new List<DateTime>();
            TimeSpan difference = to - from;
            int aggDays = (int)difference.TotalDays / noOfSplit;
            for(int x=0; x < noOfSplit; x++)
            {
                dates.Add(from.AddDays(aggDays * x));
            }
            return dates;
        }
    }
}