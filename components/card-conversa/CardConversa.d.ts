interface CardConversaProps {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
  onPress: (id: string) => void;
}
