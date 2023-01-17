import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:garosadist/delivery.dart';
import 'package:garosadist/mymap.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

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
  List<Distributor> points = [
    Distributor(
        id: 1,
        distName: "Distributor 1",
        address: "Av del Maestro y Quitumbe",
        images: [],
        lat: -0.171619,
        lng: -78.489092),
    Distributor(
        id: 2,
        distName: "Distributor 2",
        address: "6 de diciembre y Granados",
        images: [],
        lat: -0.170160,
        lng: -78.485991),
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

  @override
  void initState() {
    super.initState();
    getUserStats();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(children: [
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
          child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
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
                            fontSize: 25.0))
                  ],
                ),
              ]),
        ),
        Container(
          padding: EdgeInsets.symmetric(vertical: 25),
          margin: EdgeInsets.symmetric(vertical: 7),
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
                                        builder: (context) => Delivery()))
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
                  Text('See more', style: TextStyle(color: Colors.black45)),
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
            width: 7.0,
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
                        child:
                            Icon(Icons.check, color: Colors.white, size: 30.0),
                      )),
                  Padding(padding: EdgeInsets.only(bottom: 16.0)),
                  Text('Completed (${stats!.completedRoutes.toString()})',
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.w700,
                          fontSize: 24.0)),
                  Text('See more', style: TextStyle(color: Colors.black45)),
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
          margin: EdgeInsets.symmetric(vertical: 7),
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
                    Text('Total', style: TextStyle(color: Colors.blueAccent)),
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
                      child:
                          Icon(Icons.timeline, color: Colors.white, size: 30.0),
                    )))
              ]),
        ),
      ]),
    );
  }
}
