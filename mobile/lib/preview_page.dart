import 'package:camera/camera.dart';
import 'package:cloudinary/cloudinary.dart';
import 'package:flutter/material.dart';
import 'dart:io';

import 'package:uuid/uuid.dart';

class PreviewPage extends StatefulWidget {
  const PreviewPage(
      {Key? key, required this.picture, required this.addPic, this.url})
      : super(key: key);

  final XFile picture;
  final Function addPic;
  final String? url;

  @override
  State<PreviewPage> createState() => _PreviewPageState();
}

class _PreviewPageState extends State<PreviewPage> {
  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('Preview Page')),
        body: Stack(
          children: [
            if (widget.url != null)
              Image.network(widget.url!)
            else
              Image.file(File(widget.picture.path)),
            Positioned(
                bottom: 10,
                right: 15,
                child: InkWell(
                  onTap: () async {
                    var uuid = Uuid();
                    final cloudinary = Cloudinary.signedConfig(
                        apiKey: "949861676493662",
                        apiSecret: "liPHm8c3Eyvmmlg-i9FdjPN6XS8",
                        cloudName: "dcwxchgtw");
                    setState(() {
                      isLoading = true;
                    });
                    final response = await cloudinary.upload(
                        file: widget.picture.path,
                        fileBytes: await widget.picture.readAsBytes(),
                        resourceType: CloudinaryResourceType.image,
                        folder: "garosa",
                        fileName: uuid.v4().toString(),
                        progressCallback: (count, total) {
                          print(
                              'Uploading image from file with progress: $count/$total');
                        });

                    if (response.isSuccessful) {
                      print('Get your image from with ${response.secureUrl}');
                    }
                    setState(() {
                      isLoading = false;
                    });
                    Navigator.pop(context);
                    Navigator.pop(context);
                    print("Ssd");
                    widget.addPic(response.secureUrl);
                    print("Ssd");
                  },
                  child: Material(
                      color: Colors.teal,
                      shape: CircleBorder(),
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child:
                            Icon(Icons.check, color: Colors.white, size: 30.0),
                      )),
                )),
            if (isLoading)
              const Opacity(
                opacity: 0.8,
                child: ModalBarrier(dismissible: false, color: Colors.black),
              ),
            if (isLoading)
              const Center(
                child: CircularProgressIndicator(),
              ),
          ],
        ));
  }
}
