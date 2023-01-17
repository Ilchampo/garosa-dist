import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:garosadist/camera.dart';
import 'package:garosadist/loginpage.dart';
import 'package:garosadist/mymap.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences.setMockInitialValues({});
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("GarosaDist")),
        body: const LoginPage(),
      ),
    );
  }
}

/*class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Home Page")),
      body: SafeArea(
        child: Center(
            child: ElevatedButton(
          onPressed: () async {
            await availableCameras().then((value) => Navigator.push(context,
                MaterialPageRoute(builder: (_) => CameraPage(cameras: value))));
          },
          child: const Text("Take a Picture"),
        )),
      ),
    );
  }
}*/
