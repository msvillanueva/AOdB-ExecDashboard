using Autofac;
using Autofac.Integration.Mvc;
using ExecDashboard.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ExecDashboard
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterControllers(typeof(MvcApplication).Assembly);
            containerBuilder.RegisterModule(new AutofacWebTypesModule());
            containerBuilder.RegisterModule(new AutofacConfig());

            var container = containerBuilder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
 

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
