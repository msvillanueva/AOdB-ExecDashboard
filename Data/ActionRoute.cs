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
    
    public partial class ActionRoute
    {
        public ActionRoute()
        {
            this.ActionRoute1 = new HashSet<ActionRoute>();
            this.RolePermissions = new HashSet<RolePermission>();
        }
    
        public int ID { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public Nullable<int> Order { get; set; }
        public Nullable<int> ParentID { get; set; }
        public bool IsActive { get; set; }
    
        public virtual ICollection<ActionRoute> ActionRoute1 { get; set; }
        public virtual ActionRoute ActionRoute2 { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
    }
}
