const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) 
{
    const { movieId } = req.params;
  
    if (movieId === undefined) 
    {
        const theaters = await service.list();
      
        const theatersMap = theaters.map(async (theater) => {
            return { ...theater, movies: await service.getMovies(theater) };    
        });
      
        const data = await Promise.all(theatersMap);
      
        res.json({ data: data });
      
    } else {
        const movie_id = movieId;
      
        const theaters = await service.listMovieById(movie_id);
      
        res.json({ data: theaters });
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
}