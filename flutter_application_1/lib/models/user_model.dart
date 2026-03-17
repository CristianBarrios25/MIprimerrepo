import 'package:flutter/foundation.dart';
import 'dart:convert';

class UserModel {
  final String token;
  final int id;
  final String role;
  final String status;

  UserModel({
    required this.token,
    required this.id,
    required this.role,
    required this.status,
  });

  // El token contiene id, role y status encriptados
  // Los decodificamos del JWT payload
  factory UserModel.fromJson(Map<String, dynamic> json) {
    final token = json['token'] as String;

    // Decodificar el payload del JWT (sin verificar firma)
    final parts = token.split('.');
    final payload = parts[1];
    final normalized = base64Url.normalize(payload);
    final decoded = jsonDecode(utf8.decode(base64Url.decode(normalized)));

    return UserModel(
      token: token,
      id: decoded['id'] ?? 0,
      role: decoded['role']?.toString() ?? '',
      status: decoded['status']?.toString() ?? '',
    );
  }
}