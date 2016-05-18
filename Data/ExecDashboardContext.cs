using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class ExecDashboardContext : DbContext
    {
        public ExecDashboardContext()
            : base("JacaAccountingEntities")
        {
            Database.SetInitializer<ExecDashboardContext>(null);
        }

        #region Entity Sets
        public IDbSet<AccountEntry> AccountEntrySet { get; set; }
        public IDbSet<AccountEntryType> AccountEntryTypeSet { get; set; }
        public IDbSet<ActionRoute> ActionRouteSet { get; set; }
        public IDbSet<Bank> BankSet { get; set; }
        public IDbSet<Payee> PayeeSet { get; set; }
        public IDbSet<Project> ProjectSet { get; set; }
        public IDbSet<Report> ReportSet { get; set; }
        public IDbSet<ReportPermission> ReportPermissionSet { get; set; }
        public IDbSet<RolePermission> RolePermissionSet { get; set; }
        public IDbSet<SalesInvoice> SalesInvoiceSet { get; set; }
        public IDbSet<SalesInvoiceEntry> SalesInvoiceEntrySet { get; set; }
        public IDbSet<SystemLog> SystemLogSet { get; set; }
        public IDbSet<User> UserSet { get; set; }
        public IDbSet<Voucher> VoucherSet { get; set; }
        public IDbSet<VoucherEntry> VoucherEntrySet { get; set; }
        #endregion

        public virtual void Commit()
        {
            base.SaveChanges();
        }

    }
}
