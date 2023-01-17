import 'dart:async';

import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/material.dart';
import 'package:garosadist/camera.dart';
import 'package:garosadist/mymap.dart';
import 'package:camera/camera.dart';
import 'package:garosadist/preview_image.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Distributor {
  int id;
  String distName;
  double lat;
  double lng;
  String address;
  List<String> images;

  Distributor(
      {required this.id,
      required this.distName,
      required this.address,
      required this.images,
      required this.lat,
      required this.lng});
}

class Delivery extends StatefulWidget {
  const Delivery({Key? key}) : super(key: key);

  @override
  State<Delivery> createState() => _DeliveryState();
}

class _DeliveryState extends State<Delivery> {
  List<Distributor> points = [
    Distributor(
        id: 1,
        distName: "Distributor 1",
        address: "Av del Maestro y Quitumbe",
        images: [],
        lat: -0.122990,
        lng: -78.492225),
    Distributor(
        id: 2,
        distName: "Distributor 2",
        address: "Av Londres",
        images: [],
        lat: -0.170160,
        lng: -78.485991),
  ];

  bool isLoading = true;

  bool isVerificating = false;

  late CameraController _controller;
  late Distributor selectedPoint =
      Distributor(id: 0, distName: "", address: "", images: [], lat: 0, lng: 0);
  bool isOnRadius = false;

  void addPic(String imgUrl) {
    final pointIdx = points.indexOf(selectedPoint);
    final currentPoint = selectedPoint;
    currentPoint.images.add(imgUrl);

    setState(() {
      selectedPoint = currentPoint;
    });

    points[pointIdx] = selectedPoint;

    print(selectedPoint.images);
    print(points[0].images);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Stack(
        alignment: Alignment.center,
        children: [
          MyMap(
              gesturesEnabled: true,
              markers: points
                  .map((e) => Marker(
                      markerId: MarkerId(e.id.toString()),
                      position: LatLng(e.lat, e.lng),
                      onTap: () {
                        setState(() {
                          isOnRadius = false;
                          selectedPoint = e;
                        });
                      }))
                  .toList()),
          if (!isOnRadius && selectedPoint.distName != "")
            Positioned(
                bottom: 0,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: Colors.white,
                  ),
                  width: 375,
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 30, vertical: 25),
                              child: Material(
                                  color: Colors.blue,
                                  borderRadius: BorderRadius.circular(45.0),
                                  child: Center(
                                      child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Icon(Icons.person,
                                        color: Colors.white, size: 60.0),
                                  ))),
                            ),
                            Container(
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      selectedPoint.distName,
                                      style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w700,
                                          fontSize: 22.0),
                                    ),
                                    Text(selectedPoint.address,
                                        style: TextStyle(
                                            color: Colors.black45,
                                            fontSize: 15.0))
                                  ]),
                            )
                          ],
                        ),
                        InkWell(
                          child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(35),
                                color: Colors.blue,
                              ),
                              padding: EdgeInsets.symmetric(vertical: 15),
                              width: 250,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    "Start",
                                    style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 17.0,
                                        color: Colors.white),
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(left: 15),
                                    child: Icon(Icons.send,
                                        color: Colors.white, size: 25.0),
                                  ),
                                ],
                              )),
                          onTap: () async {
                            setState(() {
                              isVerificating = true;
                            });
                            Timer _timer = Timer(
                                Duration(seconds: 3),
                                () => setState(() {
                                      if (selectedPoint.id == 1) {
                                        isVerificating = false;
                                        isOnRadius = true;
                                      } else {
                                        isVerificating = false;
                                      }
                                    }));
                          },
                        )
                      ]),
                )),
          if (selectedPoint.distName != "" && isOnRadius)
            Positioned(
                bottom: 0,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: Colors.white,
                  ),
                  width: 375,
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 30, vertical: 25),
                              child: Material(
                                  color: Colors.blue,
                                  borderRadius: BorderRadius.circular(45.0),
                                  child: Center(
                                      child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Icon(Icons.person,
                                        color: Colors.white, size: 60.0),
                                  ))),
                            ),
                            Container(
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      selectedPoint.distName,
                                      style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w700,
                                          fontSize: 22.0),
                                    ),
                                    Text(selectedPoint.address,
                                        style: TextStyle(
                                            color: Colors.black45,
                                            fontSize: 15.0))
                                  ]),
                            )
                          ],
                        ),
                        Container(
                          margin: EdgeInsets.only(bottom: 14),
                          padding: EdgeInsets.symmetric(horizontal: 25),
                          child: TextField(
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Title',
                            ),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(bottom: 14),
                          padding: EdgeInsets.symmetric(horizontal: 25),
                          child: TextField(
                            keyboardType: TextInputType.multiline,
                            maxLines: 4,
                            decoration: const InputDecoration(
                              border: OutlineInputBorder(),
                              labelText: 'Description',
                            ),
                          ),
                        ),
                        if (selectedPoint.images.length < 1)
                          InkWell(
                            child: Container(
                              margin: EdgeInsets.symmetric(vertical: 20),
                              child: DottedBorder(
                                radius: Radius.circular(30),
                                padding: EdgeInsets.all(15),
                                color: Colors.grey,
                                child: Container(
                                  child: Icon(Icons.camera_alt,
                                      color: Colors.grey, size: 40.0),
                                ),
                              ),
                            ),
                            onTap: () async {
                              await availableCameras()
                                  .then((value) => Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (_) => CameraPage(
                                                cameras: value,
                                                addPic: addPic,
                                              ))));
                              print("Hello World");
                            },
                          ),
                        if (selectedPoint.images.length > 0)
                          Container(
                            padding: EdgeInsets.only(bottom: 25),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                for (var url in selectedPoint.images)
                                  InkWell(
                                    onTap: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  PreviewImage(
                                                    url: url,
                                                  )));
                                    },
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(10.0),
                                      child: Image.network(
                                        url,
                                        height: 100,
                                        width: 100,
                                      ),
                                    ),
                                  ),
                                InkWell(
                                  child: DottedBorder(
                                    color: Colors.grey,
                                    radius: Radius.circular(15),
                                    child: Container(
                                      child: Icon(Icons.add,
                                          color: Colors.grey, size: 50.0),
                                    ),
                                  ),
                                  onTap: () async {
                                    await availableCameras()
                                        .then((value) => Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (_) => CameraPage(
                                                      cameras: value,
                                                      addPic: addPic,
                                                    ))));
                                    print("Hello World");
                                  },
                                )
                              ],
                            ),
                          ),
                        InkWell(
                          child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(35),
                                color: Colors.blue,
                              ),
                              padding: EdgeInsets.symmetric(vertical: 15),
                              width: 250,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    "Send",
                                    style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 17.0,
                                        color: Colors.white),
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(left: 15),
                                    child: Icon(Icons.send,
                                        color: Colors.white, size: 25.0),
                                  ),
                                ],
                              )),
                          onTap: () async {
                            setState(() {});
                          },
                        )
                      ]),
                )),
          if (isVerificating)
            const Opacity(
              opacity: 0.8,
              child: ModalBarrier(dismissible: false, color: Colors.black),
            ),
          if (isVerificating)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}
