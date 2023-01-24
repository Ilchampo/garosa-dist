import cloudinary from 'cloudinary';

export async function uploadImage(file: Blob): Promise<string> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const mime = file.type;
	const enconding = 'base64';
	const data = buffer.toString(enconding);
	const uri = `data:${mime};${enconding},${data}`;

	cloudinary.v2.config({
		cloud_name: 'dri6n4kja',
		api_key: '999221789912155',
		api_secret: 'zEFPcN_Qd4VhlZQMxzZfpALYzoE'
	});

	return await cloudinary.v2.uploader.upload(uri).then((result) => {
		return result.url;
	});
}
