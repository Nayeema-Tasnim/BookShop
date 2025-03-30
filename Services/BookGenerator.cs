using Bogus;

public class BookGenerator
{
    public List<Book> GenerateBooks(int seed, int page, int count, string language, double avgLikes, double avgReviews)
    {
        var faker = new Faker<Book>(language)
            .UseSeed(seed + page) 
            .RuleFor(b => b.Index, f => f.IndexFaker + 1)
            .RuleFor(b => b.ISBN, f => f.Commerce.Ean13())
            .RuleFor(b => b.Title, f => f.Lorem.Sentence(3))
            .RuleFor(b => b.Author, f => f.Name.FullName())
            .RuleFor(b => b.Publisher, f => f.Company.CompanyName())
            .RuleFor(b => b.Likes, _ => Math.Round(avgLikes * new Random().NextDouble(), 1))
            .RuleFor(b => b.Reviews, _ => Math.Round(avgReviews * new Random().NextDouble(), 1));

        return faker.Generate(count);
    }
}
