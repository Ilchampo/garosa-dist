import 'dart:async';
import 'dart:convert';

import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/material.dart';
import 'package:garosadist/HttpService.dart';
import 'package:garosadist/camera.dart';
import 'package:garosadist/mymap.dart';
import 'package:camera/camera.dart';
import 'package:garosadist/preview_image.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart';
import 'package:quickalert/quickalert.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Point {
  int? id;
  String? pointName;
  String? pointDescription;
  String? pointImage;
  String? longitude;
  String? latitude;
  String? createdOn;
  String? updatedOn;
  bool? deleted;

  Point(
      {this.id,
      this.pointName,
      this.pointDescription,
      this.pointImage,
      this.longitude,
      this.latitude,
      this.createdOn,
      this.updatedOn,
      this.deleted});

  Point.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    pointName = json['pointName'];
    pointDescription = json['pointDescription'];
    pointImage = json['pointImage'];
    longitude = json['longitude'];
    latitude = json['latitude'];
    createdOn = json['createdOn'];
    updatedOn = json['updatedOn'];
    deleted = json['deleted'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['pointName'] = this.pointName;
    data['pointDescription'] = this.pointDescription;
    data['pointImage'] = this.pointImage;
    data['longitude'] = this.longitude;
    data['latitude'] = this.latitude;
    data['createdOn'] = this.createdOn;
    data['updatedOn'] = this.updatedOn;
    data['deleted'] = this.deleted;
    return data;
  }
}

class RoutePoint {
  int? id;
  int? routeId;
  int? pointId;
  String? reportTitle;
  String? reportDescription;
  int? routePointStatus;
  String? reportImageOne;
  String? reportImageTwo;
  String? reportImageThree;
  String? startTime;
  String? endTime;
  String? createdOn;
  String? updatedOn;
  bool? deleted;

  RoutePoint(
      {this.id,
      this.routeId,
      this.pointId,
      this.reportTitle,
      this.reportDescription,
      this.routePointStatus,
      this.reportImageOne,
      this.reportImageTwo,
      this.reportImageThree,
      this.startTime,
      this.endTime,
      this.createdOn,
      this.updatedOn,
      this.deleted});

  RoutePoint.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    routeId = json['routeId'];
    pointId = json['pointId'];
    reportTitle = json['reportTitle'];
    reportDescription = json['reportDescription'];
    routePointStatus = json['routePointStatus'];
    reportImageOne = json['reportImageOne'];
    reportImageTwo = json['reportImageTwo'];
    reportImageThree = json['reportImageThree'];
    startTime = json['startTime'];
    endTime = json['endTime'];
    createdOn = json['createdOn'];
    updatedOn = json['updatedOn'];
    deleted = json['deleted'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['routeId'] = this.routeId;
    data['pointId'] = this.pointId;
    data['reportTitle'] = this.reportTitle;
    data['reportDescription'] = this.reportDescription;
    data['routePointStatus'] = this.routePointStatus;
    data['reportImageOne'] = this.reportImageOne;
    data['reportImageTwo'] = this.reportImageTwo;
    data['reportImageThree'] = this.reportImageThree;
    data['startTime'] = this.startTime;
    data['endTime'] = this.endTime;
    data['createdOn'] = this.createdOn;
    data['updatedOn'] = this.updatedOn;
    data['deleted'] = this.deleted;
    return data;
  }
}

Future<Position> _determinePosition() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Test if location services are enabled.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    // Location services are not enabled don't continue
    // accessing the position and request users of the
    // App to enable the location services.
    return Future.error('Location services are disabled.');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied, next time you could try
      // requesting permissions again (this is also where
      // Android's shouldShowRequestPermissionRationale
      // returned true. According to Android guidelines
      // your App should show an explanatory UI now.
      return Future.error('Location permissions are denied');
    }
  }

  if (permission == LocationPermission.deniedForever) {
    // Permissions are denied forever, handle appropriately.
    return Future.error(
        'Location permissions are permanently denied, we cannot request permissions.');
  }

  // When we reach here, permissions are granted and we can
  // continue accessing the position of the device.
  return await Geolocator.getCurrentPosition();
}

class Distributor {
  int id;
  String distName;
  double lat;
  double lng;
  String address;
  int status;

  List<String> images;

  Distributor(
      {required this.id,
      required this.distName,
      required this.address,
      required this.images,
      required this.lat,
      required this.lng,
      required this.status});
}

class Delivery extends StatefulWidget {
  const Delivery({Key? key, required this.id}) : super(key: key);

  final int? id;

  @override
  State<Delivery> createState() => _DeliveryState();
}

class _DeliveryState extends State<Delivery> {
  TextEditingController titleController = TextEditingController();
  TextEditingController descController = TextEditingController();
  List<Distributor> points = [
    Distributor(
        id: 1,
        distName: "Fybeca La Luz",
        address: "RGX8+5CJ, Quito 170138",
        images: [],
        lat: -0.12839200,
        lng: -78.49914200,
        status: 0),
    Distributor(
        id: 2,
        distName: "Distributor 2",
        address: "Av Londres",
        images: [],
        lat: -0.13310600,
        lng: -78.47052700,
        status: 0),
  ];

  int pendingRoutes = 0;

  bool isLoading = true;

  bool isVerificating = false;

  late CameraController _controller;
  late Distributor selectedPoint = Distributor(
      id: 0, distName: "", address: "", images: [], lat: 0, lng: 0, status: 0);
  bool isOnRadius = false;

  void addPic(String imgUrl) {
    final pointIdx = points.indexOf(selectedPoint);
    final currentPoint = selectedPoint;
    currentPoint.images.add(imgUrl);

    setState(() {
      selectedPoint = currentPoint;
    });

    points[pointIdx] = selectedPoint;
  }

  Future fetchData() async {
    final prefs = await SharedPreferences.getInstance();
    var jwt = prefs.getString("jwt");
    Response responsePoints = await get(
        Uri.parse(HttpService().baseURL + "/points/get/all"),
        headers: {
          "Authorization": "Bearer ${jwt}",
        });

    Response responseRoutePoints = await get(
        Uri.parse(HttpService().baseURL + "/points/get/route?id=${widget.id}"),
        headers: {
          "Authorization": "Bearer ${jwt}",
        });

    if (responsePoints.statusCode == 200 &&
        responseRoutePoints.statusCode == 200) {
      Map<dynamic, dynamic> bodyPoints = jsonDecode(responsePoints.body);
      final allPoints =
          bodyPoints["payload"].map((route) => Point.fromJson(route)).toList();

      Map<dynamic, dynamic> bodyRoutePoints =
          jsonDecode(responseRoutePoints.body);
      final allRoutePoints = bodyRoutePoints["payload"]
          .map((route) => RoutePoint.fromJson(route))
          .toList();

      List<Distributor> dists = [];
      int pending = 0;

      Response respComplete = await get(
          Uri.parse(
              HttpService().baseURL + "/points/validate/route?id=${widget.id}"),
          headers: {
            "Authorization": "Bearer ${jwt}",
          });

      if (respComplete.statusCode == 400) {
        setState(() {
          pendingRoutes = jsonDecode(respComplete.body)['payload'].length;
        });
      }
      if (respComplete.statusCode == 200) {
        setState(() {
          pendingRoutes = 0;
        });
      }

      for (var i = 0; i < allRoutePoints.length; i++) {
        final poi =
            allPoints.firstWhere((p) => p.id == allRoutePoints[i].pointId);

        dists.add(Distributor(
            id: allRoutePoints[i].id,
            distName: poi.pointName,
            address: poi.pointDescription,
            images: [],
            lat: double.parse(poi.latitude),
            lng: double.parse(poi.longitude),
            status: allRoutePoints[i].routePointStatus));
      }

      return dists;
    } else {
      throw Exception("Failed to fetch posts");
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(),
      body: FutureBuilder(
          future: fetchData(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              points = snapshot.data as List<Distributor>;
              return Stack(
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
                  if (pendingRoutes > 0)
                    Positioned(
                        top: 0,
                        child: Container(
                            decoration: BoxDecoration(
                              color: Colors.green,
                            ),
                            padding: EdgeInsets.symmetric(vertical: 11),
                            width: screenWidth,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  "There are still ${pendingRoutes} points pending",
                                  style: TextStyle(
                                      fontSize: 15.0, color: Colors.white),
                                ),
                                /*Container(
                                margin: EdgeInsets.only(left: 8),
                                child: Icon(
                                  Icons.check,
                                  color: Colors.white,
                                  size: 25.0,
                                ),
                              ),*/
                              ],
                            ))),
                  if (pendingRoutes == 0)
                    Positioned(
                        top: 0,
                        child: InkWell(
                          onTap: () async {
                            final prefs = await SharedPreferences.getInstance();
                            var jwt = prefs.getString("jwt");
                            setState(() {
                              isVerificating = true;
                            });
                            Response res = await put(
                                Uri.parse(HttpService().baseURL +
                                    "/routes/complete/route?id=${widget.id}"),
                                headers: {
                                  "Authorization": "Bearer ${jwt}",
                                });
                            if (res.statusCode == 200) {
                              print("completed");
                              QuickAlert.show(
                                  context: context,
                                  type: QuickAlertType.success,
                                  text: jsonDecode(res.body)["msg"]);
                            } else {
                              QuickAlert.show(
                                  context: context,
                                  type: QuickAlertType.error,
                                  text: jsonDecode(res.body)["msg"]);
                            }
                            setState(() {
                              isVerificating = false;
                            });
                          },
                          child: Container(
                              decoration: BoxDecoration(
                                color: Colors.green,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              padding: EdgeInsets.symmetric(vertical: 11),
                              width: 200,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    "Finish",
                                    style: TextStyle(
                                        fontSize: 15.0, color: Colors.white),
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(left: 8),
                                    child: Icon(
                                      Icons.check,
                                      color: Colors.white,
                                      size: 25.0,
                                    ),
                                  ),
                                ],
                              )),
                        )),
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
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Container(
                                      padding: EdgeInsets.symmetric(
                                          horizontal: 15, vertical: 25),
                                      child: Material(
                                          color: Colors.blue,
                                          borderRadius:
                                              BorderRadius.circular(45.0),
                                          child: Center(
                                              child: Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Icon(Icons.person,
                                                color: Colors.white,
                                                size: 40.0),
                                          ))),
                                    ),
                                    Container(
                                      width: 270,
                                      child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              selectedPoint.distName,
                                              style: TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.w700,
                                                  fontSize: 17.0),
                                            ),
                                            Text(selectedPoint.address,
                                                style: TextStyle(
                                                    color: Colors.black45,
                                                    fontSize: 11.0)),
                                          ]),
                                    )
                                  ],
                                ),
                                if (selectedPoint.status == 2)
                                  Container(
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(35),
                                        color: Colors.green,
                                      ),
                                      padding:
                                          EdgeInsets.symmetric(vertical: 11),
                                      width: 250,
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            "Completed",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0,
                                                color: Colors.white),
                                          ),
                                          Container(
                                            margin: EdgeInsets.only(left: 15),
                                            child: Icon(Icons.check,
                                                color: Colors.white,
                                                size: 25.0),
                                          ),
                                        ],
                                      ))
                                else
                                  InkWell(
                                    child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(35),
                                          color: Colors.blue,
                                        ),
                                        padding:
                                            EdgeInsets.symmetric(vertical: 11),
                                        width: 250,
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
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
                                                  color: Colors.white,
                                                  size: 25.0),
                                            ),
                                          ],
                                        )),
                                    onTap: () async {
                                      setState(() {
                                        isVerificating = true;
                                      });
                                      if (selectedPoint.status == 1) {
                                        setState(() {
                                          isOnRadius = true;
                                        });
                                      } else {
                                        final geopos =
                                            await _determinePosition();

                                        final prefs = await SharedPreferences
                                            .getInstance();
                                        var jwt = prefs.getString("jwt");
                                        Response res = await put(
                                            Uri.parse(HttpService().baseURL +
                                                "/points/edit/start?pointId=${selectedPoint.id}&latitude=${geopos.latitude}&longitude=${geopos.longitude}"),
                                            headers: {
                                              "Authorization": "Bearer ${jwt}",
                                            });
                                        if (res.statusCode == 200) {
                                          setState(() {
                                            isOnRadius = true;
                                          });

                                          QuickAlert.show(
                                              context: context,
                                              type: QuickAlertType.success,
                                              text:
                                                  jsonDecode(res.body)["msg"]);
                                        } else {
                                          QuickAlert.show(
                                              context: context,
                                              type: QuickAlertType.error,
                                              text:
                                                  jsonDecode(res.body)["msg"]);
                                        }
                                      }

                                      setState(() {
                                        isVerificating = false;
                                      });
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
                                Container(
                                  padding: EdgeInsets.symmetric(horizontal: 25),
                                  child: Row(
                                    children: [
                                      Container(
                                        margin: EdgeInsets.only(right: 15),
                                        padding:
                                            EdgeInsets.symmetric(vertical: 25),
                                        child: Material(
                                            color: Colors.blue,
                                            borderRadius:
                                                BorderRadius.circular(45.0),
                                            child: Center(
                                                child: Padding(
                                              padding:
                                                  const EdgeInsets.all(8.0),
                                              child: Icon(Icons.person,
                                                  color: Colors.white,
                                                  size: 40.0),
                                            ))),
                                      ),
                                      Container(
                                        width: 250,
                                        child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                selectedPoint.distName,
                                                style: TextStyle(
                                                    color: Colors.black,
                                                    fontWeight: FontWeight.w700,
                                                    fontSize: 17.0),
                                              ),
                                              Text(selectedPoint.address,
                                                  style: TextStyle(
                                                      color: Colors.black45,
                                                      fontSize: 12.0))
                                            ]),
                                      )
                                    ],
                                  ),
                                ),
                                Container(
                                  margin: EdgeInsets.only(bottom: 14),
                                  padding: EdgeInsets.symmetric(horizontal: 25),
                                  child: TextField(
                                    controller: titleController,
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
                                    controller: descController,
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
                                      margin:
                                          EdgeInsets.symmetric(vertical: 20),
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
                                    },
                                  ),
                                if (selectedPoint.images.length > 0)
                                  Container(
                                    padding: EdgeInsets.only(bottom: 25),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
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
                                              borderRadius:
                                                  BorderRadius.circular(10.0),
                                              child: Image.network(
                                                url,
                                                height: 100,
                                                width: 100,
                                              ),
                                            ),
                                          ),
                                        if (selectedPoint.images.length < 3)
                                          InkWell(
                                            child: DottedBorder(
                                              color: Colors.grey,
                                              radius: Radius.circular(15),
                                              child: Container(
                                                child: Icon(Icons.add,
                                                    color: Colors.grey,
                                                    size: 50.0),
                                              ),
                                            ),
                                            onTap: () async {
                                              await availableCameras().then(
                                                  (value) => Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                          builder: (_) =>
                                                              CameraPage(
                                                                cameras: value,
                                                                addPic: addPic,
                                                              ))));
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
                                      padding:
                                          EdgeInsets.symmetric(vertical: 15),
                                      width: 250,
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            "Send",
                                            style: TextStyle(
                                                fontWeight: FontWeight.w700,
                                                fontSize: 15.0,
                                                color: Colors.white),
                                          ),
                                          Container(
                                            margin: EdgeInsets.only(left: 15),
                                            child: Icon(Icons.send,
                                                color: Colors.white,
                                                size: 22.0),
                                          ),
                                        ],
                                      )),
                                  onTap: () async {
                                    print(selectedPoint.images);
                                    final prefs =
                                        await SharedPreferences.getInstance();
                                    var jwt = prefs.getString("jwt");
                                    final geopos = await _determinePosition();
                                    print("sadasd");
                                    setState(() {
                                      isVerificating = true;
                                    });
                                    Response res = await put(
                                        Uri.parse(HttpService().baseURL +
                                            "/points/edit/upload?pointId=${selectedPoint.id}&latitude=${geopos.latitude}&longitude=${geopos.longitude}"),
                                        headers: {
                                          "Content-Type":
                                              "application/x-www-form-urlencoded",
                                          "Authorization": "Bearer ${jwt}",
                                        },
                                        encoding: Encoding.getByName('utf-8'),
                                        body: {
                                          "reportTitle": titleController.text,
                                          "reportDescription":
                                              descController.text,
                                          "reportImageOne":
                                              selectedPoint.images[0],
                                          "reportImageTwo":
                                              selectedPoint.images[1],
                                          "reportImageThree":
                                              selectedPoint.images[2]
                                        });
                                    setState(() {
                                      isVerificating = false;
                                    });
                                    if (res.statusCode == 200) {
                                      setState(() {
                                        selectedPoint = Distributor(
                                            id: 0,
                                            distName: "",
                                            address: "",
                                            images: [],
                                            lat: 0,
                                            lng: 0,
                                            status: 0);
                                      });
                                      /*final idxPoint = points.indexWhere(
                                          (e) => e.id == selectedPoint.id);
                                      final mypoints = points;
                                      mypoints[idxPoint].status = 2;
                                      setState(() {
                                        points = mypoints;
                                      });*/

                                      QuickAlert.show(
                                          context: context,
                                          type: QuickAlertType.success,
                                          text: jsonDecode(res.body)["msg"]);
                                      titleController.text = "";
                                      descController.text = "";

                                      pendingRoutes -= 1;
                                    } else {
                                      QuickAlert.show(
                                          context: context,
                                          type: QuickAlertType.error,
                                          text: jsonDecode(res.body)["msg"]);
                                    }
                                    print(res.body);
                                  },
                                )
                              ]),
                        )),
                  if (isVerificating)
                    const Opacity(
                      opacity: 0.8,
                      child:
                          ModalBarrier(dismissible: false, color: Colors.black),
                    ),
                  if (isVerificating)
                    const Center(
                      child: CircularProgressIndicator(),
                    ),
                ],
              );
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            }

            return CircularProgressIndicator();
          }),
    );
  }
}
