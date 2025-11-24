import CryptoJS from 'crypto-js';

/**
 * Encryption Service for End-to-End Encryption
 * 
 * IMPORTANT SECURITY NOTE:
 * This is a PLACEHOLDER implementation for demonstration purposes only.
 * 
 * For production, you MUST implement a proper E2EE protocol such as:
 * - Signal Protocol (recommended)
 * - Double Ratchet Algorithm
 * - X3DH (Extended Triple Diffie-Hellman)
 * 
 * DO NOT use this implementation in production as it has security flaws:
 * - No proper key exchange mechanism
 * - Single encryption key is insecure
 * - No forward secrecy
 * - No key rotation
 * - Vulnerable to key compromise
 */
class EncryptionService {
  /**
   * Encrypt a message using AES encryption
   * WARNING: In production, use proper E2EE with unique per-chat keys
   * @param message - The message to encrypt
   * @param key - The encryption key (minimum 32 characters recommended for AES-256 security)
   */
  encryptMessage(message: string, key: string): string {
    try {
      // Validate minimum key length for security
      // Note: crypto-js AES uses PBKDF2 to derive a 256-bit key from the passphrase
      if (!key || key.length < 32) {
        throw new Error('Encryption key must be at least 32 characters for strong security');
      }
      const encrypted = CryptoJS.AES.encrypt(message, key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt message');
    }
  }

  /**
   * Decrypt a message using AES decryption
   * @param encryptedMessage - The encrypted message
   * @param key - The encryption key (must match the encryption key used)
   */
  decryptMessage(encryptedMessage: string, key: string): string {
    try {
      // Validate minimum key length for security
      if (!key || key.length < 32) {
        throw new Error('Decryption key must be at least 32 characters for strong security');
      }
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error('Decryption failed - invalid key or corrupted data');
      }
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt message');
    }
  }

  /**
   * Generate a unique encryption key for a chat
   * 
   * PLACEHOLDER: In production, implement proper key exchange:
   * 1. Use Diffie-Hellman or ECDH for key agreement
   * 2. Derive session keys using HKDF
   * 3. Implement key rotation
   * 4. Store keys securely (Keychain/Keystore)
   * 
   * @param chatId - The chat identifier
   * @param userId1 - First participant ID
   * @param userId2 - Second participant ID
   */
  generateChatKey(chatId: string, userId1: string, userId2: string): string {
    // WARNING: This is NOT secure for production
    // Real implementation should use proper key exchange protocol
    const combinedData = `${chatId}-${userId1}-${userId2}`;
    return CryptoJS.SHA256(combinedData).toString();
  }

  /**
   * Hash a value (e.g., for phone number verification)
   */
  hash(value: string): string {
    return CryptoJS.SHA256(value).toString();
  }

  /**
   * Generate a random salt
   */
  generateSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  /**
   * Generate a secure random key
   * Use this for generating unique chat keys in development
   */
  generateSecureKey(length: number = 32): string {
    return CryptoJS.lib.WordArray.random(length).toString();
  }
}

export default new EncryptionService();
