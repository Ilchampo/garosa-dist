import 'dart:async';
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:garosadist/HttpService.dart';
import 'package:garosadist/homepage.dart';
import 'package:http/http.dart';
import 'package:jwt_decode/jwt_decode.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool isLoading = false;
  login(String email, String password) async {
    Response res = await post(
        Uri.parse(HttpService().baseURL + "/users/login/mobile"),
        body: {"email": email, "password": password});
    Map<dynamic, dynamic> json = jsonDecode(res.body);

    Map<dynamic, dynamic> jwtDecoded = Jwt.parseJwt(json["payload"]);
    final prefs = await SharedPreferences.getInstance();

    print(jwtDecoded);
    print(jwtDecoded["firstName"]);

    prefs.setInt("userId", jwtDecoded["userId"]);
    prefs.setInt("roleId", jwtDecoded["roleId"]);
    prefs.setString("firstName", jwtDecoded["firstName"]);
    prefs.setString("lastName", jwtDecoded["lastName"]);
    prefs.setString("email", jwtDecoded["email"]);

    if (res.statusCode == 200) {
      Navigator.push(
          context, MaterialPageRoute(builder: (context) => HomePage()));
    }

    /*if (email == "distributor@garosa.com" || password == "Password1234") {
      final prefs = await SharedPreferences.getInstance();
      prefs.setInt("userId", 12);
      prefs.setInt("roleId", 2);
      prefs.setString("firstName", "Garosa");
      prefs.setString("lastName", "Dist");
      prefs.setString("email", "distributor@garosa.com");

      Navigator.push(
          context, MaterialPageRoute(builder: (context) => HomePage()));
    }*/
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(10),
        child: Stack(
          children: [
            ListView(
              children: <Widget>[
                Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(10),
                    child: const Text(
                      'GarosaDist',
                      style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.w500,
                          fontSize: 30),
                    )),
                Container(
                    alignment: Alignment.center,
                    padding: const EdgeInsets.all(10),
                    child: const Text(
                      'Sign in',
                      style: TextStyle(fontSize: 20),
                    )),
                Container(
                  padding: const EdgeInsets.all(10),
                  child: TextField(
                    controller: nameController,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'User Name',
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
                  child: TextField(
                    obscureText: true,
                    controller: passwordController,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    'Forgot Password',
                  ),
                ),
                Container(
                    height: 50,
                    padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: ElevatedButton(
                      child: const Text('Login'),
                      onPressed: () async {
                        setState(() {
                          isLoading = true;
                        });
                        Timer _timer = Timer(
                            Duration(seconds: 4),
                            () => setState(() {
                                  isLoading = false;
                                  login(nameController.text,
                                      passwordController.text);
                                }));
                      },
                    )),
              ],
            ),
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
