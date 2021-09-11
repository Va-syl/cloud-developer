import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // FilteredImage Endpoint
  // Filter an image from a public url.
  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400)
                .send(`image_url is required`);
    }

    let filteredImage = await filterImageFromURL(image_url).then().catch();

    //Set content-type for response
    res.setHeader("Content-Type","image/jpg");

    await res.status(200)
              .sendFile(filteredImage, function (error) {
                if (error) {
                  return res.status(422)
                    .send("Unable to get filtered image");
                } 

                //cleanup the image after 
                var files:string[] = [filteredImage]
                deleteLocalFiles(files);
              
              });
  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();