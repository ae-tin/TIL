# 🧯 예외 처리 (Exception Handling)

> 예외가 발생했을 때 프로그램이 비정상적으로 종료되지 않고,  
> **적절하게 처리**할 수 있도록 하는 방법

---

## ✅ 예외 처리란?

- 예외 처리를 통해 오류가 발생해도 프로그램의 흐름을 안전하게 이어갈 수 있음
- Python에서는 `try`, `except` 구문을 사용하여 특정 예외를 잡아내고 원하는 동작을 수행할 수 있음
- 예외 처리를 구현하면 프로그램 사용자에게 오류 메시지를 보여주거나 **대체 로직**을 실행할 수 있음

---

# 🧯 예외 처리 사용 구문

Python에서 예외 처리는 `try`, `except`, `else`, `finally` 구문을 통해 처리할 수 있습니다.

---

## ✅ 기본 구조

- **`try`**  
  예외가 발생할 수 있는 코드를 작성

- **`except`**  
  예외가 발생했을 때 실행할 코드를 작성

- **`else`**  
  예외가 발생하지 않았을 때 실행할 코드를 작성

- **`finally`**  
  예외 발생 여부와 관계없이 항상 실행할 코드를 작성

---

## ✅ 예제 코드

```python
try:
    x = int(input('숫자를 입력하세요: '))
    y = 10 / x
except ZeroDivisionError:
    print('0으로 나눌 수 없습니다.')
except ValueError:
    print('유효한 숫자가 아닙니다.')
else:
    print(f'결과: {y}')
finally:
    print('프로그램이 종료되었습니다.')
```





# ⚠️ 내장 예외의 상속 계층 구조 주의 (1/2)

다음 코드를 보면, `except Exception:`이 모든 예외를 먼저 가로채기 때문에 이후의 `except ZeroDivisionError:` 블록은 **절대 실행되지 않습니다**.

---

## ❌ 잘못된 예외 처리 순서 예시

```python
try:
    num = int(input('100으로 나눌 값을 입력하세요: '))
    print(100 / num)

except Exception:
    print('숫자를 넣어주세요.')

except ZeroDivisionError:
    print('0으로 나눌 수 없습니다.')

except:
    print('에러가 발생하였습니다.')
```



## ✅ 올바른 처리 순서

``` python
try:
 num = int(input('100으로 나눌 값을 입력하세요: '))
 print(100 / num)

except ZeroDivisionError:
 print('0으로 나눌 수 없습니다.')

except ValueError:
 print('유효한 숫자가 아닙니다.')

except Exception:
 print('기타 에러가 발생하였습니다.')
```





# 🧩 `as` 키워드: 예외 객체 활용

## 📌 개념 정리

- **예외 객체**는 예외가 발생했을 때 그 **예외에 대한 정보**를 담고 있는 객체입니다.
- `except` 블록에서 `as` 키워드를 통해 예외 객체를 받아 **상세한 오류 정보**를 확인할 수 있습니다.

---

## ✅ 코드 예시

```python
my_list = []
try:
    number = my_list[1]
except IndexError as error:
    print(f'{error}가 발생했습니다.')
```




















