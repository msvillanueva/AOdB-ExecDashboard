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
    
    public partial class SalesInvoice
    {
        public SalesInvoice()
        {
            this.SalesInvoiceEntries = new HashSet<SalesInvoiceEntry>();
        }
    
        public int ID { get; set; }
        public int AddedByID { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public System.DateTime DateAdded { get; set; }
        public string Customer { get; set; }
        public string TIN { get; set; }
        public string Address { get; set; }
        public string Business { get; set; }
        public string Terms { get; set; }
        public string PWDNo { get; set; }
        public string PWDSignature { get; set; }
        public int PercentCompletion { get; set; }
        public decimal PWDDiscount { get; set; }
        public decimal VatExemptSales { get; set; }
        public decimal ZeroRatedSales { get; set; }
        public bool IsSubmitted { get; set; }
        public Nullable<System.DateTime> DateSubmitted { get; set; }
        public bool IsCollected { get; set; }
        public Nullable<System.DateTime> DateCollected { get; set; }
        public string InvoiceNo { get; set; }
        public Nullable<bool> Vatable { get; set; }
        public string ORNo { get; set; }
    
        public virtual Project Project { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<SalesInvoiceEntry> SalesInvoiceEntries { get; set; }
    }
}