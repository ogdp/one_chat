export const formChangePassword = (name, randomCode) => {
  return /*html*/ `
      <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 10px;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); text-align: center; margin-top: 30px; margin-bottom: 30px;">
          <div style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 10px;">
              Xin chào, ${name}!
          </div>
          <div style="font-size: 16px; color: #555555; line-height: 1.6;">
            <p>Chúng tôi nhận được yêu cầu thay đổi mật khẩu cho tài khoản của bạn.</p>
            <p>Mã xác nhận của bạn là: <br /><strong style="font-size: 30px; background-color: #e6e6e6;">${randomCode}</strong></p>
            <p>Mã chỉ hoạt động trong 5 phút. Vui lòng sử dụng mã này để thay đổi mật khẩu của bạn theo bước tiếp theo trên trang web của chúng tôi.</p>
            <p>Đây là một mã xác nhận duy nhất và chỉ có hiệu lực trong một khoảng thời gian ngắn.</p>
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng liên hệ chúng tôi ngay lập tức qua địa chỉ email
              <a href="mailto:" style="color: #007bff;  text-decoration: none;" >support@onechat.com</a>
                hoặc số điện thoại 1800-789-789.
            </p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            <p>Trân trọng,</p>
            <p>OneChat</p>
          </div>
        </div>
      </div>
    `;
};
