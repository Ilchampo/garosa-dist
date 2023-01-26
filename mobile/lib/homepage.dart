import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:garosadist/HttpService.dart';
import 'package:garosadist/delivery.dart';
import 'package:garosadist/mymap.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ResponseBack {
  String? msg;
  List<Route>? payload;

  ResponseBack({this.msg, this.payload});

  ResponseBack.fromJson(Map<String, dynamic> json) {
    msg = json['msg'];
    if (json['payload'] != null) {
      payload = <Route>[];
      json['payload'].forEach((v) {
        payload!.add(new Route.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['msg'] = this.msg;
    if (this.payload != null) {
      data['payload'] = this.payload!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Route {
  int? id;
  int? supervisorId;
  int? distributorId;
  String? routeTitle;
  String? routeDescription;
  int? routeStatus;
  String? startTime;
  String? endTime;
  String? createdOn;
  String? updatedOn;
  bool? deleted;

  Route(
      {this.id,
      this.supervisorId,
      this.distributorId,
      this.routeTitle,
      this.routeDescription,
      this.routeStatus,
      this.startTime,
      this.endTime,
      this.createdOn,
      this.updatedOn,
      this.deleted});

  Route.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    supervisorId = json['supervisorId'];
    distributorId = json['distributorId'];
    routeTitle = json['routeTitle'];
    routeDescription = json['routeDescription'];
    routeStatus = json['routeStatus'];
    startTime = json['startTime'];
    endTime = json['endTime'];
    createdOn = json['createdOn'];
    updatedOn = json['updatedOn'];
    deleted = json['deleted'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['supervisorId'] = this.supervisorId;
    data['distributorId'] = this.distributorId;
    data['routeTitle'] = this.routeTitle;
    data['routeDescription'] = this.routeDescription;
    data['routeStatus'] = this.routeStatus;
    data['startTime'] = this.startTime;
    data['endTime'] = this.endTime;
    data['createdOn'] = this.createdOn;
    data['updatedOn'] = this.updatedOn;
    data['deleted'] = this.deleted;
    return data;
  }
}

class UserStats {
  String firstName;
  String lastName;
  int completedRoutes;
  int pendingRoutes;

  UserStats({
    required this.firstName,
    required this.lastName,
    required this.completedRoutes,
    required this.pendingRoutes,
  });
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Route currentRoute;
  List<Distributor> points = [
    Distributor(
        id: 1,
        distName: "Distributor 1",
        address: "Av del Maestro y Quitumbe",
        images: [],
        lat: -0.171619,
        lng: -78.489092,
        status: 0),
    Distributor(
        id: 2,
        distName: "Distributor 2",
        address: "6 de diciembre y Granados",
        images: [],
        lat: -0.170160,
        lng: -78.485991,
        status: 0),
  ];

  UserStats? stats;

  getUserStats() async {
    final prefs = await SharedPreferences.getInstance();
    var firstName = prefs.getString("firstName").toString();
    var lastName = prefs.getString("lastName").toString();

    setState(() {
      stats = UserStats(
          firstName: firstName,
          lastName: lastName,
          completedRoutes: 0,
          pendingRoutes: 0);
    });
  }

  Future _fetchRoute() async {
    final prefs = await SharedPreferences.getInstance();
    var jwt = prefs.getString("jwt");
    final response = await get(
        Uri.parse(HttpService().baseURL + "/routes/get/distributor"),
        headers: {
          "Authorization": "Bearer ${jwt}",
        });

    if (response.statusCode == 200) {
      ResponseBack resp = ResponseBack.fromJson(jsonDecode(response.body));
      int completed = 0;
      int pending = 0;

      for (var i = 0; i < resp.payload!.length; i++) {
        if (resp.payload![i].routeStatus == 0) {
          pending += 1;
        } else {
          completed += 1;
        }

        final prefs = await SharedPreferences.getInstance();
        var firstName = prefs.getString("firstName").toString();
        var lastName = prefs.getString("lastName").toString();

        setState(() {
          stats = UserStats(
              firstName: firstName,
              lastName: lastName,
              completedRoutes: completed,
              pendingRoutes: pending);
        });
      }
      final currentRoute = resp.payload
          ?.firstWhere((e) => e.routeStatus == 0, orElse: () => Route(id: 0));
      if (currentRoute!.id == 0) {
        return currentRoute;
      }

      return currentRoute;
    } else {
      throw Exception("Failed to fetch posts");
    }
  }

  @override
  void initState() {
    super.initState();
    getUserStats();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: FutureBuilder(
        future: _fetchRoute(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            currentRoute = snapshot.data as Route;

            return ListView(children: [
              Container(
                padding: EdgeInsets.symmetric(vertical: 40, horizontal: 45),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                      bottomLeft: Radius.circular(10),
                      bottomRight: Radius.circular(10)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: Offset(0, 3), // changes position of shadow
                    ),
                  ],
                ),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                  Material(
                      color: Colors.blue,
                      borderRadius: BorderRadius.circular(45.0),
                      child: Center(
                          child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child:
                            Icon(Icons.person, color: Colors.white, size: 60.0),
                      ))),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Welcome',
                          style: TextStyle(
                              color: Colors.blueAccent, fontSize: 20.0)),
                      Text(stats!.firstName + " " + stats!.lastName,
                          style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.w700,
                              fontSize: 20.0))
                    ],
                  ),
                ]),
              ),
              if (currentRoute.id != 0)
                Container(
                  padding: EdgeInsets.symmetric(vertical: 25),
                  margin: EdgeInsets.symmetric(vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(10),
                        topRight: Radius.circular(10),
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10)),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          children: [
                            Text(
                              "Current route",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w700,
                                  fontSize: 22.0),
                            ),
                            Container(
                              margin: EdgeInsets.symmetric(vertical: 20),
                              child: ElevatedButton(
                                  onPressed: () => {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) => Delivery(
                                                      id: currentRoute.id,
                                                    )))
                                      },
                                  child: Text("See details")),
                            )
                          ],
                        ),
                        flex: 1,
                      ),
                      Expanded(
                        child: Container(
                          height: 200,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(20),
                                  topRight: Radius.circular(20),
                                  bottomLeft: Radius.circular(20),
                                  bottomRight: Radius.circular(20))),
                          child: Container(
                              child: MyMap(
                                  gesturesEnabled: false,
                                  markers: points
                                      .map((e) => Marker(
                                          markerId: MarkerId(e.id.toString()),
                                          position: LatLng(e.lat, e.lng)))
                                      .toList())),
                        ),
                        flex: 1,
                      )
                    ],
                  ),
                ),
              Row(children: [
                Expanded(
                  flex: 1,
                  child: Container(
                      padding: EdgeInsets.symmetric(vertical: 40),
                      child: Column(children: [
                        Material(
                            color: Colors.amber,
                            shape: CircleBorder(),
                            child: Padding(
                              padding: EdgeInsets.all(16.0),
                              child: Icon(Icons.pending_outlined,
                                  color: Colors.white, size: 30.0),
                            )),
                        Padding(padding: EdgeInsets.only(bottom: 16.0)),
                        Text('Pending (${stats!.pendingRoutes.toString()})',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.w700,
                                fontSize: 24.0)),
                      ]),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(10),
                            topRight: Radius.circular(10),
                            bottomLeft: Radius.circular(10),
                            bottomRight: Radius.circular(10)),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 5,
                            blurRadius: 7,
                            offset: Offset(0, 3), // changes position of shadow
                          ),
                        ],
                      )),
                ),
                VerticalDivider(
                  width: 3.0,
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                      padding: EdgeInsets.symmetric(vertical: 40),
                      child: Column(children: [
                        Material(
                            color: Colors.teal,
                            shape: CircleBorder(),
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Icon(Icons.check,
                                  color: Colors.white, size: 30.0),
                            )),
                        Padding(padding: EdgeInsets.only(bottom: 16.0)),
                        Text('Completed (${stats!.completedRoutes.toString()})',
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.w700,
                                fontSize: 24.0)),
                      ]),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(10),
                            topRight: Radius.circular(10),
                            bottomLeft: Radius.circular(10),
                            bottomRight: Radius.circular(10)),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 5,
                            blurRadius: 7,
                            offset: Offset(0, 3), // changes position of shadow
                          ),
                        ],
                      )),
                ),
              ]),
              Container(
                margin: EdgeInsets.symmetric(vertical: 4),
                padding: EdgeInsets.symmetric(vertical: 40, horizontal: 45),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                      bottomLeft: Radius.circular(10),
                      bottomRight: Radius.circular(10)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: Offset(0, 3), // changes position of shadow
                    ),
                  ],
                ),
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Total',
                              style: TextStyle(color: Colors.blueAccent)),
                          Text(
                              '${(stats!.completedRoutes + stats!.pendingRoutes).toString()} routes',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w700,
                                  fontSize: 34.0))
                        ],
                      ),
                      Material(
                          color: Colors.blue,
                          borderRadius: BorderRadius.circular(24.0),
                          child: Center(
                              child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Icon(Icons.timeline,
                                color: Colors.white, size: 30.0),
                          )))
                    ]),
              ),
            ]);
          } else if (snapshot.hasError) {
            return Text("${snapshot.error}");
          }

          return CircularProgressIndicator();
        },
      ),
    );
  }
}
