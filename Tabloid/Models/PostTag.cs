using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tabloid.Models
{
    public class PostTag : Controller
    {
        // GET: PostTag
        public ActionResult Index()
        {
            return View();
        }

        // GET: PostTag/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PostTag/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PostTag/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PostTag/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PostTag/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PostTag/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PostTag/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
