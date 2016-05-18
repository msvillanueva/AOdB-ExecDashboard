using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        ExecDashboardContext dbContext;

        public ExecDashboardContext Init()
        {
            return dbContext ?? (dbContext = new ExecDashboardContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
