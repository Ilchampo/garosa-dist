import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MyMap extends StatefulWidget {
  const MyMap({Key? key, this.markers, required this.gesturesEnabled})
      : super(key: key);

  final List<Marker>? markers;
  final gesturesEnabled;

  @override
  _MyMapState createState() => _MyMapState();
}

class _MyMapState extends State<MyMap> {
  late GoogleMapController mapController;

  final LatLng _center = const LatLng(-0.171619, -78.489092);

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      zoomControlsEnabled: widget.gesturesEnabled,
      scrollGesturesEnabled: widget.gesturesEnabled,
      tiltGesturesEnabled: widget.gesturesEnabled,
      rotateGesturesEnabled: widget.gesturesEnabled,
      zoomGesturesEnabled: widget.gesturesEnabled,
      onMapCreated: _onMapCreated,
      initialCameraPosition: CameraPosition(
        target: _center,
        zoom: 11.0,
      ),
      markers: Set<Marker>.of(widget.markers!),
    );
  }
}
