import { injectable } from "inversify";
import { Media } from "../models";
import path from 'path';
import { config } from "dotenv";
config();

const port = process.env.PORT || 3000;

@injectable()
export class MediaService {
  async uploadMedia(file: any, { title, description, uploadedBy, tags }: any) {
    const newMedia = new Media({
      title: title,
      description: description,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size,
      uploadedBy: uploadedBy,
      tags: tags ? tags.split(",") : [],
    });

    const result = await newMedia.save();
    return result;
  }

  async viewMedia() {

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "uploadedBy",
          foreignField: "_id",
          as: "uploadedBy"
        }
      },
      {
        $addFields: {
          uploadedBy: "$uploadedBy.username" 
        }
      },
       {
         $unwind: {
           path: "$uploadedBy",
           preserveNullAndEmptyArrays: true
         }
       }
    ];

    const mediaData = await Media.aggregate(pipeline);

    const transformedMedia = mediaData.map(media => ({
      ...media,
      image: `http://localhost:${port}/uploads/${path.basename(media.filePath)}`,
      fileSize: this.formatFileSize(media.fileSize)
    }));
    return transformedMedia;
  }

  deleteMedia(id : string){
    return Media.findByIdAndDelete(id);
  }

  viewMediaById(id : string){
    return Media.findById(id);
  }

  updateMedia(id :string, data : any){
    return Media.findByIdAndUpdate(id, data, {new: true});
  }

   formatFileSize(bytes : number) {
    if (bytes < 1024) return bytes + ' B';
    let kB = bytes / 1024;
    if (kB < 1024) return kB.toFixed(2) + ' KB';
    let MB = kB / 1024;
    return MB.toFixed(2) + ' MB';
  }
}
