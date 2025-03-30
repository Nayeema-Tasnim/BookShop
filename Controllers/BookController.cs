using Microsoft.AspNetCore.Mvc;

public class BookController : Controller
{
    private readonly BookGenerator _bookGenerator = new BookGenerator();

    [HttpGet]
    public IActionResult Details(int id, int seed, int page, string language)
{
    var books = _bookGenerator.GenerateBooks(seed, page, 20, language, 0, 0);
    var book = books.FirstOrDefault(b => b.Index == id);
    if (book == null)
    {
        return NotFound();
    }

    return View(book);
}

public IActionResult Index()
{
    return View(); 
}


[HttpGet]
public JsonResult GetBooks(int seed = 0, int page = 1, string language = "en", double avgLikes = 5, double avgReviews = 5)
{
    var books = _bookGenerator.GenerateBooks(seed, page, 20, language, avgLikes, avgReviews);
    return Json(books); 
}

}
