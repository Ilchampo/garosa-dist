import 'package:camera/camera.dart';
import 'package:cloudinary/cloudinary.dart';
import 'package:flutter/material.dart';
import 'dart:io';

import 'package:uuid/uuid.dart';

class PreviewImage extends StatefulWidget {
  const PreviewImage({Key? key, required this.url}) : super(key: key);

  final String url;

  @override
  State<PreviewImage> createState() => _PreviewImageState();
}

class _PreviewImageState extends State<PreviewImage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('Preview Page')),
        body: Stack(
          children: [
            Image.network(widget.url),
          ],
        ));
  }
}
