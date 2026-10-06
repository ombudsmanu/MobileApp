import React, { useMemo } from 'react';
import { View } from 'react-native';
import { createStyles } from './Icon.styles';

/**
 * Geometric icon set built from Views.
 * Names: menu, grid, doc, folder, chart, users, inbox, calendar,
 *        search, settings, palette, logout, login, chevronLeft,
 *        chevronUp, close, user, lock, mail, bell, check, eye, eyeOff */
const Icon = ({ name, size = 22, color = '#FFFFFF', weight = 2 }) => {
  const s = useMemo(
    () => createStyles(size, color, weight),
    [size, color, weight],
  );
  const u = size / 24; // unit scale against a 24px grid

  const bar = (w, h, top, left, extra) => (
    <View style={[s.bar, { width: w, height: h, top, left }, extra]} />
  );

  switch (name) {
    case 'menu':
      return (
        <View style={s.box}>
          {bar(size, weight, size * 0.22, 0)}
          {bar(size, weight, size * 0.47, 0)}
          {bar(size * 0.66, weight, size * 0.72, 0)}
        </View>
      );

    case 'grid':
      return (
        <View style={s.box}>
          {[0, 1].map(r =>
            [0, 1].map(c => (
              <View
                key={`${r}${c}`}
                style={[
                  s.square,
                  {
                    width: size * 0.4,
                    height: size * 0.4,
                    top: r * size * 0.55,
                    left: c * size * 0.55,
                  },
                ]}
              />
            )),
          )}
        </View>
      );

    case 'doc':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.7,
                height: size * 0.9,
                top: size * 0.05,
                left: size * 0.15,
              },
            ]}
          />
          {bar(size * 0.4, weight, size * 0.32, size * 0.3)}
          {bar(size * 0.4, weight, size * 0.5, size * 0.3)}
          {bar(size * 0.26, weight, size * 0.68, size * 0.3)}
        </View>
      );

    case 'folder':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.9,
                height: size * 0.66,
                top: size * 0.2,
                left: size * 0.05,
              },
            ]}
          />
          {bar(size * 0.38, weight, size * 0.14, size * 0.05)}
        </View>
      );

    case 'chart':
      return (
        <View style={s.box}>
          {bar(weight, size * 0.34, size * 0.52, size * 0.16)}
          {bar(weight, size * 0.6, size * 0.26, size * 0.46)}
          {bar(weight, size * 0.46, size * 0.4, size * 0.76)}
          {bar(size, weight, size * 0.86, 0)}
        </View>
      );

    case 'users':
      return (
        <View style={s.box}>
          <View
            style={[
              s.circle,
              {
                width: size * 0.34,
                height: size * 0.34,
                top: size * 0.08,
                left: size * 0.12,
              },
            ]}
          />
          <View
            style={[
              s.circle,
              {
                width: size * 0.28,
                height: size * 0.28,
                top: size * 0.14,
                left: size * 0.56,
              },
            ]}
          />
          <View
            style={[
              s.square,
              {
                width: size * 0.5,
                height: size * 0.34,
                top: size * 0.52,
                left: size * 0.04,
              },
            ]}
          />
          <View
            style={[
              s.square,
              {
                width: size * 0.4,
                height: size * 0.3,
                top: size * 0.56,
                left: size * 0.54,
              },
            ]}
          />
        </View>
      );

    case 'inbox':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.9,
                height: size * 0.7,
                top: size * 0.16,
                left: size * 0.05,
              },
            ]}
          />
          {bar(size * 0.34, weight, size * 0.52, size * 0.33)}
        </View>
      );

    case 'calendar':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.86,
                height: size * 0.78,
                top: size * 0.14,
                left: size * 0.07,
              },
            ]}
          />
          {bar(size * 0.86, weight, size * 0.38, size * 0.07)}
          {bar(weight, size * 0.16, 0, size * 0.28)}
          {bar(weight, size * 0.16, 0, size * 0.68)}
        </View>
      );

    case 'search':
      return (
        <View style={s.box}>
          <View
            style={[
              s.circle,
              {
                width: size * 0.62,
                height: size * 0.62,
                top: size * 0.06,
                left: size * 0.06,
              },
            ]}
          />
          {bar(size * 0.3, weight, size * 0.74, size * 0.6, {
            transform: [{ rotate: '45deg' }],
          })}
        </View>
      );

    case 'settings':
      return (
        <View style={s.box}>
          <View
            style={[
              s.circle,
              {
                width: size * 0.44,
                height: size * 0.44,
                top: size * 0.28,
                left: size * 0.28,
              },
            ]}
          />
          {[0, 45, 90, 135].map(deg => (
            <View
              key={deg}
              style={[
                s.bar,
                {
                  width: size * 0.96,
                  height: weight,
                  top: size * 0.5 - weight / 2,
                  left: size * 0.02,
                  transform: [{ rotate: `${deg}deg` }],
                },
              ]}
            />
          ))}
          <View
            style={[
              s.circle,
              {
                width: size * 0.5,
                height: size * 0.5,
                top: size * 0.25,
                left: size * 0.25,
                borderWidth: weight * 2.5,
              },
            ]}
          />
        </View>
      );

    case 'palette':
      return (
        <View style={s.box}>
          <View
            style={[
              s.circle,
              {
                width: size * 0.9,
                height: size * 0.9,
                top: size * 0.05,
                left: size * 0.05,
              },
            ]}
          />
          <View
            style={[
              s.fill,
              {
                width: size * 0.18,
                height: size * 0.18,
                borderRadius: size,
                top: size * 0.2,
                left: size * 0.3,
              },
            ]}
          />
          <View
            style={[
              s.fill,
              {
                width: size * 0.18,
                height: size * 0.18,
                borderRadius: size,
                top: size * 0.38,
                left: size * 0.6,
              },
            ]}
          />
          <View
            style={[
              s.fill,
              {
                width: size * 0.18,
                height: size * 0.18,
                borderRadius: size,
                top: size * 0.62,
                left: size * 0.34,
              },
            ]}
          />
        </View>
      );

    case 'logout':
    case 'login':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.5,
                height: size * 0.9,
                top: size * 0.05,
                left: name === 'logout' ? 0 : size * 0.5,
              },
            ]}
          />
          {bar(size * 0.46, weight, size * 0.5 - weight / 2, size * 0.42)}
          {bar(size * 0.26, weight, size * 0.36, size * 0.62, {
            transform: [{ rotate: name === 'logout' ? '45deg' : '-45deg' }],
          })}
          {bar(size * 0.26, weight, size * 0.64, size * 0.62, {
            transform: [{ rotate: name === 'logout' ? '-45deg' : '45deg' }],
          })}
        </View>
      );

    case 'chevronLeft':
    case 'chevronRight': {
      const arm = size * 0.3;
      const shift = name === 'chevronRight' ? 1 : -1;
      return (
        <View style={s.box}>
          {bar(
            arm,
            weight,
            size * 0.5 - arm * 0.35,
            size * 0.5 + shift * arm * 0.3,
            {
              transform: [{ rotate: `${shift * 45}deg` }],
            },
          )}
          {bar(
            arm,
            weight,
            size * 0.5 + arm * 0.35,
            size * 0.5 + shift * arm * 0.3,
            {
              transform: [{ rotate: `${-shift * 45}deg` }],
            },
          )}
        </View>
      );
    }
    case 'chevronUp':
      return (
        <View style={s.box}>
          <View
            style={{
              width: size * 0.42,
              height: size * 0.42,
              borderLeftWidth: weight,
              borderTopWidth: weight,
              borderColor: color,
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      );

    case 'close':
      return (
        <View style={s.box}>
          {bar(size * 0.8, weight, size * 0.5 - weight / 2, size * 0.1, {
            transform: [{ rotate: '45deg' }],
          })}
          {bar(size * 0.8, weight, size * 0.5 - weight / 2, size * 0.1, {
            transform: [{ rotate: '-45deg' }],
          })}
        </View>
      );

    case 'user':
      return (
        <View style={s.box}>
          <View
            style={[
              s.circle,
              {
                width: size * 0.42,
                height: size * 0.42,
                top: size * 0.06,
                left: size * 0.29,
              },
            ]}
          />
          <View
            style={[
              s.square,
              {
                width: size * 0.72,
                height: size * 0.38,
                top: size * 0.58,
                left: size * 0.14,
              },
            ]}
          />
        </View>
      );

    case 'lock':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.7,
                height: size * 0.5,
                top: size * 0.44,
                left: size * 0.15,
              },
            ]}
          />
          <View
            style={[
              s.circle,
              {
                width: size * 0.42,
                height: size * 0.42,
                top: size * 0.12,
                left: size * 0.29,
              },
            ]}
          />
        </View>
      );

    case 'mail':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.9,
                height: size * 0.66,
                top: size * 0.17,
                left: size * 0.05,
              },
            ]}
          />
          {bar(size * 0.5, weight, size * 0.36, size * 0.05, {
            transform: [{ rotate: '30deg' }],
          })}
          {bar(size * 0.5, weight, size * 0.36, size * 0.45, {
            transform: [{ rotate: '-30deg' }],
          })}
        </View>
      );

    case 'bell':
      return (
        <View style={s.box}>
          <View
            style={[
              s.square,
              {
                width: size * 0.62,
                height: size * 0.6,
                top: size * 0.14,
                left: size * 0.19,
                borderRadius: size * 0.3,
              },
            ]}
          />
          {bar(size * 0.86, weight, size * 0.74, size * 0.07)}
          <View
            style={[
              s.fill,
              {
                width: size * 0.18,
                height: size * 0.1,
                top: size * 0.82,
                left: size * 0.41,
                borderRadius: size,
              },
            ]}
          />
        </View>
      );

    case 'check':
      return (
        <View style={s.box}>
          <View
            style={{
              width: size * 0.5,
              height: size * 0.28,
              borderLeftWidth: weight * 1.4,
              borderBottomWidth: weight * 1.4,
              borderColor: color,
              transform: [{ rotate: '-45deg' }],
              marginTop: -size * 0.08,
            }}
          />
        </View>
      );
    case 'eye':
    case 'eyeOff': {
      const lens = size * 0.6;
      const pupil = size * 0.26;
      return (
        <View style={s.box}>
          {/* Almond outline: a square with two opposite corners fully
              rounded, turned 45° so the sharp corners point left and right */}
          <View
            style={{
              width: lens,
              height: lens,
              borderWidth: weight,
              borderColor: color,
              borderTopLeftRadius: lens,
              borderBottomRightRadius: lens,
              borderTopRightRadius: weight,
              borderBottomLeftRadius: weight,
              transform: [{ rotate: '45deg' }],
            }}
          />
          {/* Pupil */}
          <View
            style={[
              s.fill,
              {
                width: pupil,
                height: pupil,
                borderRadius: pupil,
                top: (size - pupil) / 2,
                left: (size - pupil) / 2,
              },
            ]}
          />
          {/* Slash for the "hidden" state */}
          {name === 'eyeOff' &&
            bar(size * 0.95, weight, (size - weight) / 2, size * 0.025, {
              transform: [{ rotate: '45deg' }],
            })}
        </View>
      );
    }
    default:
      return <View style={s.box} />;
  }
};

export default Icon;
