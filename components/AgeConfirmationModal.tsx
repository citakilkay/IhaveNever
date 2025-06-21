import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type AgeConfirmationModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    yesColor?: string;
    noColor?: string;
};

export default function AgeConfirmationModal({
    visible,
    onConfirm,
    onCancel,
    yesColor = '#00c896',
    noColor = '#aaa',
}: AgeConfirmationModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Are you 18 or older?</Text>
                    <Text style={styles.text}>
                        This category includes adult-themed content. Please confirm your age to continue.
                    </Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: yesColor }]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Yes, I am 18+</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: noColor }]} onPress={onCancel}>
                            <Text style={styles.buttonText}>No, take me back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(12, 12, 20, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#1a1a2e',
        padding: 24,
        borderRadius: 24,
        width: '85%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 24,
    },
    buttons: {
        gap: 12,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
});