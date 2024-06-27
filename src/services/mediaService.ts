import { injectable } from "inversify";
import { Media } from "../models";

@injectable()
 export class MediaService {
    async uploadMedia( file : any, { title , description , uploadedBy, tags } :any ){
        const newMedia = new Media({
            title: title,
            description: description,
            filePath: file.path,
            fileType: file.mimetype,
            fileSize: file.size,
            uploadedBy: uploadedBy,
            tags: tags ? tags.split(',') : []
          });
      
          const result = await newMedia.save();
          return result
    }
 }