import BottomSheetBase, { BottomSheetProps as BaseBottomSheetProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';

import type { CustomTheme } from '@/constants/theme';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

const Content = styled.View({
  flex: 1,
  padding: 16,
});

const Header = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e7eb',
  marginBottom: 16,
});

const Title = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  color: theme.colors.text,
}));

const CloseButton = styled.Pressable({
  paddingVertical: 0,
  paddingHorizontal: 12,
});

const CloseText = styled.Text(({ theme }) => ({
  color: theme.colors.textSecondary,
  fontSize: 14,
}));

interface BottomSheetProps extends Partial<BaseBottomSheetProps> {
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
  isFullScreen?: boolean;
  index?: number;
  onChange?: (index: number) => void;
}

export const BottomSheet = forwardRef<BottomSheetBase, BottomSheetProps>(
  ({ title, onClose, children, snapPoints: customSnapPoints, isFullScreen, index = -1, onChange, ...props }, ref) => {
    const theme = useTheme() as CustomTheme;

    const snapPoints = useMemo(() =>
      customSnapPoints || (isFullScreen ? ["100%"] : ["25%", "50%", "75%"]),
      [customSnapPoints, isFullScreen]
    );

    const renderBackdrop = useCallback(
      (backdropProps: any) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <BottomSheetBase
        ref={ref}
        index={index}
        onChange={onChange}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textSecondary }}
        backdropComponent={renderBackdrop}
        {...props}
      >
        <Content>
          {(title || onClose) && (
            <Header>
              <Title>{title}</Title>
              {onClose && (
                <CloseButton onPress={onClose}>
                  <CloseText>Close</CloseText>
                </CloseButton>
              )}
            </Header>
          )}
          {children}
        </Content>
      </BottomSheetBase>
    );
  }
); 