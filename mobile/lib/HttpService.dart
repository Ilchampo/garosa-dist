import 'dart:convert';
import 'package:http/http.dart';

class HttpService {
  final String baseURL = "http://172.31.215.47:3000/api/v1";

  login(String email, String password) async {
    final String url = baseURL + "/users/login/mobile";
    print(url);

    Map data = {"email": email, "password": password};

    print(data);
    var res = await post(Uri.parse(url), body: json.encode(data), headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br"
    }).catchError((error) {
      print(error);
    });

    if (res.statusCode == 200) {
      print(res.body);
    }
  }

  test() async {
    Response res = await get(
      Uri.parse(
          "https://c5ca-2800-bf0-16d-123e-5c26-f557-3ec4-749f.sa.ngrok.io/api/v1/logs/test"),
    );
    print("res");
    print(res.body);
    if (res.statusCode == 200) {
      print(res.body);
    }
  }
}
