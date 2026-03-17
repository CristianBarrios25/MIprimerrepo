import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api.config.dart';
import '../models/user_model.dart';

class AuthService {

  Future<UserModel> login(String apiUser, String apiPassword) async {
    final response = await http.post(
      Uri.parse(ApiConfig.login),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'api_user': apiUser,       // ← campos exactos de tu API
        'api_password': apiPassword,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final user = UserModel.fromJson(data);
      await _saveToken(user.token);
      return user;
    } else {
      final error = jsonDecode(response.body);
      throw Exception(error['error'] ?? 'Error al iniciar sesión');
    }
  }

  Future<void> _saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }

  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
  Future<void> register(String name, String email, String password) async {
  final response = await http.post(
    Uri.parse(ApiConfig.register),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'user': email,        // Api_user = email
      'password': password,
      'status': 'Active',
      'role': 'User',
    }),
  );

  if (response.statusCode == 201) {
    return;
  } else {
    final error = jsonDecode(response.body);
    throw Exception(error['error'] ?? 'Error al registrarse');
  }
}
}