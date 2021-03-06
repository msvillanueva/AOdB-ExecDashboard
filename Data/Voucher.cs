//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Voucher
    {
        public Voucher()
        {
            this.VoucherEntries = new HashSet<VoucherEntry>();
        }
    
        public int ID { get; set; }
        public int PayeeID { get; set; }
        public int ProjectID { get; set; }
        public string Remarks { get; set; }
        public string CheckNo { get; set; }
        public Nullable<decimal> CheckAmount { get; set; }
        public int AddedByID { get; set; }
        public System.DateTime DateAdded { get; set; }
        public bool Submitted { get; set; }
        public Nullable<System.DateTime> DateSubmitted { get; set; }
        public Nullable<System.DateTime> CheckDate { get; set; }
    
        public virtual Payee Payee { get; set; }
        public virtual Project Project { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<VoucherEntry> VoucherEntries { get; set; }
    }
}
