using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Data;
using Data.Infrastructure;
using Data.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ExecDashboard.App_Start
{
    public class AutofacConfig : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // EF ExecDashboardContext
            builder.RegisterType<ExecDashboardContext>()
                   .As<DbContext>()
                   .InstancePerRequest();

            builder.RegisterType<DbFactory>()
                .As<IDbFactory>()
                .InstancePerRequest();

            builder.RegisterType<UnitOfWork>()
                .As<IUnitOfWork>()
                .InstancePerRequest();

            builder.RegisterGeneric(typeof(EntityBaseRepository<>))
                   .As(typeof(IEntityBaseRepository<>))
                   .InstancePerRequest();
        }
    }
}