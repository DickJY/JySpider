const t = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl"
const a = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4"
const e = 'Z21kD9ZK1ke6ugku2ccWu-MeDWh3z252xRTQv-wZ6jddVo3tJLe7gIXz4PyxGl73nSfLAADyElSjjvrYdCvEP4pfohVVEX1DxoI0yhm36ytQNvu-WLU94qULZQ72aml6TXeAJQ5LlUUYfIpXGRVstLnioWd0FObTgnuLJ3h86jw3aglalulGA0R3nzYESZxzIBm3Byj31ED-gsyloES4xlW8C0x-p2HxCF8ceYvgT2fv3kHQOtm2SDAcx78hCvPXCER5CzCtoyXvhEIcOkXIRihI-jeAI3zRHLycoPqmVcGEgWOgjUamK3Rm28AoZr7Njx_Q6IimrACD3cE9TLYtXZQ5XWw0cOtrgqO9TzjQWWFdklP35CdX-b0xiinCjDb9eIxUHk-Di3ZEWrEdDWhmf90a2FylNM9-iK7tjEEL5Rjd5QtDhfUugp0eVvWTamn9NbjwbKrnla_1GR3SltaHbrEcKPkrHZb1yUxEUDKKwNLLFUyoVv_D9DaPgC4f1NMQL8KcdPbmZi8ObVGN1WIpgJusJTCa7kzHLrk_Qq6El_lsIBpmm-4N80gm_tb7z6Y01Pu_U_76Xj0Cex7Dsz0QVnMjoLdpaObtf2iDaNnclBYaDCii3zXgeUnutXhdM227fTkySBDScuNJdx9nYYiCPQV5TQPxcG4BBsh-DcPyeMhZdxEGkTDKSNwuQNe6WXuy3c800BhxVPyQBaE5Nkx3Y7Ew5XgQdCjVjQ36oa1vL04wd7Ja6l6MsW8AIwzLQYZA-ay6X8ZinUmMdDFs5F2KkEEzSE6of1P5bxF5PM6osuQSlhx4fGF3yc6voqHOnpD0OV0A41WCsJisee7G_ZcO-5q7V2b-8H93R8NaxpAxrIlwNO6FSpSKVnzx67ADaca0nw1o82q0sHKwyGYGZU4GcoYPVNzgLMVuWgms_ahzxJ44EykuOpUp8XVQMG7kOxmyBf7dygztvE6O-8cWVyOdfvkr6NjVDjz6IkagcakFTF8='
const crypto = require('crypto');
function T(e) {
                return crypto.createHash("md5").update(e).digest()
            }
function get_response(e, t, a) {
    if (!e)
        return null;
    const o = Buffer.alloc(16, T(t))
      , n = Buffer.alloc(16, T(a))
      , r = crypto.createDecipheriv("aes-128-cbc", o, n);
    let s = r.update(e, "base64", "utf-8");
    return s += r.final("utf-8"),
    s
}

// console.log(get_response(e, t, a));