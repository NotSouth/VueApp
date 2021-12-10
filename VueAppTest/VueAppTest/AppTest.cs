using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Threading;

namespace VueAppTest
{
    [TestClass]
    public class AppTest
    {
        IWebDriver driver;
        DirectoryInfo appDir = new DirectoryInfo(Directory.GetCurrentDirectory()).Parent.Parent.Parent.Parent.Parent;

        [TestInitialize]
        public void Setup()
        {
            driver = new FirefoxDriver();
            //driver.Navigate().GoToUrl(@"http://127.0.0.1:5500/index.html");
        }

        [TestCleanup()]
        public void Cleanup()
        {
            driver.Quit();
        }

        [TestMethod]
        public void IsCorrectWebsite()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/index.html");

            IWebElement brandElement = driver.FindElement(By.Id("brandname"));

            Assert.AreEqual(brandElement.Text, "SenseApp");
        }


        [TestMethod]
        public void ReadIndexTable()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/index.html");
            Thread.Sleep(1000);

            IWebElement latestco2 = driver.FindElement(By.Id("latestco2"));
            IWebElement latesttemp = driver.FindElement(By.Id("latesttemp"));
            IWebElement latesthum = driver.FindElement(By.Id("latesthum"));

            // The guideline is that you shouldn't assert more than one thing in one test,
            // however this is really only one thing - getting data from the api.
            Assert.AreNotEqual(latestco2, " ppm");
            Assert.AreNotEqual(latesttemp, " °C");
            Assert.AreNotEqual(latesthum, " %");
        }

        [TestMethod]
        public void IndexPageNavigation()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/index.html");
            Assert.AreEqual(driver.Title, "SenseApp");

            // Elements must be found during navigation, otherwise they become stale, when the page changes.
            IWebElement homeButton = driver.FindElement(By.Id("homebutton"));
            homeButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp");
            driver.Navigate().Back();

            IWebElement archiveButton = driver.FindElement(By.Id("archivebutton"));
            archiveButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Archive");
            driver.Navigate().Back();

            IWebElement averagesButton = driver.FindElement(By.Id("averagesbutton"));
            averagesButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Averages");
        }

        [TestMethod]
        public void ArchivePageNavigation()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/archive.html");
            Assert.AreEqual(driver.Title, "SenseApp Archive");

            IWebElement homeButton = driver.FindElement(By.Id("homebutton"));
            homeButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp");
            driver.Navigate().Back();

            IWebElement archiveButton = driver.FindElement(By.Id("archivebutton"));
            archiveButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Archive");
            driver.Navigate().Back();

            IWebElement averagesButton = driver.FindElement(By.Id("averagesbutton"));
            averagesButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Averages");
        }

        [TestMethod]
        public void AveragesPageNavigation()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/averages.html");
            Assert.AreEqual(driver.Title, "SenseApp Averages");

            IWebElement homeButton = driver.FindElement(By.Id("homebutton"));
            homeButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp");
            driver.Navigate().Back();

            IWebElement archiveButton = driver.FindElement(By.Id("archivebutton"));
            archiveButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Archive");
            driver.Navigate().Back();

            IWebElement averagesButton = driver.FindElement(By.Id("averagesbutton"));
            averagesButton.Click();
            Assert.AreEqual(driver.Title, "SenseApp Averages");
        }


        [TestMethod]
        public void DoesArchivePageReceiveData()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/archive.html");

            Thread.Sleep(1000);

            ReadOnlyCollection<IWebElement> tableRows = driver.FindElements(By.TagName("tr"));

            Assert.IsTrue(tableRows.Count > 1);
        }


        [TestMethod]
        public void DoesAveragesPageReceiveData()
        {
            driver.Navigate().GoToUrl(@"file:///" + appDir + @"/averages.html");

            Thread.Sleep(1000);

            ReadOnlyCollection<IWebElement> tableRows = driver.FindElements(By.TagName("tr"));

            Assert.IsTrue(tableRows.Count > 1);
        }
    }
}
